import A from '../const/actionTypes'
import actions from '.'
import threadUtil from '../utils/threadUtil'

export default {
  sortThreads: (sortField) => {
    return (dispatch, getState) => {
      let sortedThreads = {}
      const threads = getState().threads
      const sortedKeys = Object.keys(threads).sort((threadIdA, threadIdB) => {
        let order = 0
        switch (sortField) {
          case 'lastUpdatedAt':
            order = new Date(threads[threadIdB].lastUpdatedAt) -
              new Date(threads[threadIdA].lastUpdatedAt)
            break
        }

        return order
      })
      sortedKeys.map((sortKey) => {
        sortedThreads[sortKey] = threads[sortKey]
      })
      // console.log('sortedKeys: ', sortedKeys)
      // console.log('sorted threads result: ', sortedThreads)
      dispatch({
        type: A.SORT_THREADS,
        sortedThreads
      })
    }
  },
  listThreads: () => {
    return (dispatch, getState) => {
      console.log('abcdefg', window.gapi)
      window.gapi.client.gmail.users.threads.list({
        userId: 'me',
        labelIds: ['INBOX'],
        // list 30 threads per page
        maxResults: 30
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log('getting gmail threads fail: ', response.status)
          return
        }

        let respRes = response.result.threads ? response.result.threads : []
        let promiseArr = []
        respRes.forEach((threadObj) => {
          let thread = {}
          thread.threadId = threadObj.id
          thread.snippet = threadObj.snippet
          dispatch({
            type: A.RECEIVE_THREAD,
            threadId: threadObj.id,
            thread
          })

          // check whether this works
          // control async actions flow with redux-thunk
          promiseArr.push(dispatch(actions.getThread(threadObj.id)))
        })

        Promise.all(promiseArr).then(() => {
          // console.log(threadResArr)
          // sort by field lastUpdatedAt
          dispatch(actions.sortThreads('lastUpdatedAt'))
        })
      })
    }
  },
  getThread: (threadId) => {
    return (dispatch, getState) => {
      return window.gapi.client.gmail.users.threads.get({
        userId: 'me',
        id: threadId
      })
      .then((response) => {
        // console.log('*********', response.result)
        if (response.status !== 200) {
          console.log(response.status + ' cannot get thread: ' + threadId)
          return Promise.resolve()
        }

        let thread = {}
        let projects = getState().projects
        let projectItems = getState().projectItems

        thread = threadUtil.extractThreadInfo(response.result)

        dispatch({
          type: A.UPDATE_THREAD,
          threadId,
          thread
        })

        // update project list
        if (thread.tag && thread.tag.type === 'project') {
          dispatch({
            type: A.RECEIVE_TAG,
            tag: thread.tag,
            threadId
          })

          // update projectItems list and projects list
          const name = thread.tag.name
          const projIndex = projects.indexOf(name)
          if (projIndex < 0) {
            // create new project and item
            dispatch({
              type: A.RECEIVE_PROJECT,
              name
            })

            dispatch({
              type: A.RECEIVE_PROJECT_ITEM,
              data: {
                newCount: 1,
                color: colorList[projects.length],
                key: projects.length + 1,
                title: name
              }
            })
          } else {
            // update item newCount
            dispatch({
              type: A.INCRE_ITEM_COUNT,
              projIndex
            })
          }

        }

        // return Promise.resolve({[threadId]: thread})
        return Promise.resolve()
      })
    }
  }
}

const colorList = [
  'rgb(254, 153, 15)',
  'red',
  'yellow',
  'purple',
  'pink',
  'blue',
  'green'
]
