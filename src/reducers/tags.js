import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = currentState
  switch (action.type) {
    case A.RECEIVE_TAG:
      updatedState.push({
        type: action.tag.type,
        name: action.tag.name,
        threadId: action.threadId
      })
      console.log('RECEIVE_THREADS reducers', updatedState)
      break
  }
  return updatedState || {}
}
