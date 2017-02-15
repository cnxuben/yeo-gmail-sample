import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)
  switch (action.type) {
    case A.RECEIVE_THREAD:
      updatedState[action.threadId] = Object.assign({}, action.thread)
      // console.log('RECEIVE_THREADS reducers', updatedState)
      break
    case A.UPDATE_THREAD:
      updatedState[action.threadId] = Object.assign(
        {},
        updatedState[action.threadId],
        action.thread
      )
      // console.log('UPDATE_THREAD reducers', updatedState)
      break
    case A.SORT_THREADS:
      updatedState = Object.assign({}, action.sortedThreads)
      // console.log('SORT_THREADS: ', updatedState)
      break
  }
  return updatedState || {}
}
