import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import routeParamsReducer from './routeParams'
import projectItemsReducer from './projectItems'
import threadsReducer from './threads'
import tagsReducer from './tags'

const rootReducer = combineReducers({
  routing: routerReducer,
  routeParams: routeParamsReducer,
  projectItems: projectItemsReducer,
  threads: threadsReducer,
  tags: tagsReducer
})

export default rootReducer
