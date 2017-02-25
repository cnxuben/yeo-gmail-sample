import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import routeParamsReducer from './routeParams'
import projectsReducer from './projects'
import projectItemsReducer from './projectItems'
import threadsReducer from './threads'
import tagsReducer from './tags'

const rootReducer = combineReducers({
  routing: routerReducer,
  routeParams: routeParamsReducer,
  projects: projectsReducer,
  projectItems: projectItemsReducer,
  threads: threadsReducer,
  tags: tagsReducer
})

export default rootReducer
