import A from '../const/actionTypes'
import actions from '.'
import threadUtil from '../utils/threadUtil'

export default {
  listThreads: () => {
    return (dispatch, getState) => {
      console.log('abcdefg', window.gapi)
      window.gapi.client.gmail.users.threads.list({
        userId: 'me',
        labelIds: ['INBOX', 'STARRED'],
        // list 30 threads per page
        maxResults: 10
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log('getting gmail threads fail: ', response.status)
          return
        }

        let respRes = response.result.threads ? response.result.threads : []
        respRes.forEach((threadObj) => {
          let thread = {}
          thread.threadId = threadObj.id
          thread.snippet = threadObj.snippet
          dispatch({
            type: A.RECEIVE_THREAD,
            threadId: threadObj.id,
            thread
          })
          dispatch(actions.getThread(threadObj.id))
          // sort by field lastUpdatedAt
          // dispatch(actions.sortThreads('lastUpdatedAt'))
        })
      })
    }
  },
  getThread: (threadId) => {
    return (dispatch, getState) => {
      window.gapi.client.gmail.users.threads.get({
        userId: 'me',
        id: threadId
      })
      .then((response) => {
        console.log('*********', response.result)
        if (response.status !== 200) {
          console.log(response.status + ' cannot get thread: ' + threadId)
          return
        }

        let thread = {}

        thread = threadUtil.extractThreadInfo(response.result)

        console.log('thread going to be updated: ', thread)
        dispatch({
          type: A.UPDATE_THREAD,
          threadId: thread.id,
          thread
        })
      })
    }
  }
}
