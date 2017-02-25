import A from '../const/actionTypes'

export default {
  getProjectItems: () => {
    return (dispatch, getState) => {
      console.log('tags here: ', getState().tags)
      const tags = getState().tags || []
      if (tags && tags.length > 0) {
        console.log('tags && tags.length > 0 true')
        let labelList = []
        let projectItems = []
        tags.forEach((tag, index) => {
          if (labelList.indexOf(tag.name) < 0) {
            labelList.push(tag.name)
            projectItems.push({
              key: labelList.length,
              color: colorList[labelList.length - 1],
              title: tag.name,
              newCount: 1
            })
          } else {
            projectItems[labelList.indexOf(tag.name)].newCount++
          }

          // store.dispatch({
          //   type: A.UPDATE_TAG,
          //   updateData: {
          //     color: projectItems[labelList.indexOf(tag.name)].color
          //   },
          //   index
          // })
        })
        console.log('********   projectItems: ', projectItems)
        store.dispatch({
          type: A.RECEIVE_PROJECT_ITEMS,
          projectItems,
        })
      }
    }
  }
}
