import A from '../const/actionTypes'

export default (currentState, action) => {
  let updatedState = currentState
  let stateByIdx = {}
  switch (action.type) {
    case A.RECEIVE_PROJECT_ITEM:
      updatedState = updatedState.concat([
        {
          color: action.data.color,
          key: action.data.key,
          newCount: action.data.newCount,
          title: action.data.title
        }
      ])
      // console.log('project items data: ', updatedState)
      break
    case A.INCRE_ITEM_COUNT:
      stateByIdx = updatedState[action.projIndex]
      updatedState = updatedState
        .slice(0, action.projIndex)
        .concat([
            {
              color: stateByIdx.color,
              key: stateByIdx.key,
              newCount: stateByIdx.newCount + 1,
              title: stateByIdx.title
            }
          ])
        .concat(updatedState.slice(action.projIndex + 1))
        // console.log('INCRE_ITEM_COUNT: ', updatedState)
        break
  }
  return updatedState || {}
}
