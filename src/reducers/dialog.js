import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = currentState
  switch (action.type) {
    case A.OPEN_PROJ_DIALOG:
      updatedState.projOpen = true
      break
    case A.CLOSE_PROJ_DIALOG:
      updatedState.projOpen = false
      break
    case A.OPEN_BUNDLE_DIALOG:
      updatedState.bundleOpen = true
      break
    case A.CLOSE_BUNDLE_DIALOG:
      updatedState.bundleOpen = false
      break
  }
  return updatedState || {}
}
