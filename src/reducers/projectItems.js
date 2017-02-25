import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = Object.assign({}, currentState)
  switch (action.type) {
    case A.RECEIVE_PROJECT_ITEMS:
      updatedState = Object.assign({}, action.projectItems)
      console.log('RECEIVE_PROJECT_ITEMS reducers', updatedState)
      break
  }
  return updatedState || {}
}
