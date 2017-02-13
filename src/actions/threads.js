import A from '../const/actionTypes'
import actions from '.'

export default {
  listThreads: () => {
    return (dispatch, getState) => {
      console.log('abcdefg', window.gapi)
      window.gapi.client.gmail.users.threads.list({
        userId: 'me',
        labelIds: ['INBOX', 'STARRED'],
        // list 30 threads per page
        maxResults: 30
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

        const respThread = response.result
        let thread = {}

        // add new fields
        const subjectIndex = respThread.messages[0].payload.headers.findIndex((header) => {
          return 'Subject' === header.name
        })
        thread.subject = respThread.messages[0].payload.headers[subjectIndex].value

        thread.msgCount = respThread.messages.length
        // pst timestamp of the last msg
        const lastUpatedAtIndex = respThread.messages[thread.msgCount - 1].payload
          .headers.findIndex((header) => {
            return 'Received' === header.name
          })
        thread.lastUpatedAt = respThread.messages[thread.msgCount - 1].payload
          .headers[lastUpatedAtIndex].value.split(';')[1].trim()

        thread.labels = respThread.messages[thread.msgCount - 1].labelIds
        thread.membersNum = respThread.messages.map((msg) => {
          let members = []
          msg.payload.headers.map((header) => {
            if ('From' === header.name) {
              if (members.indexOf(header.value) < 0) {
                members.push(header.value)
              }
            }
          })
          return members.length
        })[0]

        // add tag obj to thread
        // thread.tag = addTagToThread(respThread)

        // console.log('thread going to be updated: ', thread)
        dispatch({
          type: A.UPDATE_THREAD,
          threadId: thread.id,
          thread
        })
      })
    }
  }
}
