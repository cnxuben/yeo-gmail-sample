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
      // console.log('RECEIVE_TAG reducers', updatedState)
      break
    case A.UPDATE_TAG:
      updatedState[action.index] = Object.assign(
        {},
        action.updateData,
        updatedState[action.index]
      )
      break
  }
  return updatedState || {}
}
