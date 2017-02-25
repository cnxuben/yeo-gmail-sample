import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = currentState
  switch (action.type) {
    case A.RECEIVE_PROJECT:
      updatedState = updatedState.concat([
        action.name
      ])
      // console.log('RECEIVE_PROJECT: ', updatedState)
      break
  }
  return updatedState || []
}
