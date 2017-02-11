import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import routeParamsReducer from './routeParams'

const rootReducer = combineReducers({
  routing: routerReducer,
  routeParams: routeParamsReducer
})

export default rootReducer
