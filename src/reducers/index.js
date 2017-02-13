import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import routeParamsReducer from './routeParams'
import threadsReducer from './threads'

const rootReducer = combineReducers({
  routing: routerReducer,
  routeParams: routeParamsReducer,
  threads: threadsReducer
})

export default rootReducer
