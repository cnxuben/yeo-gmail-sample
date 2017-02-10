import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import initialState from './initialState'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const logger = store => next => action => {
  return next(action)
}
const middleware = routerMiddleware(browserHistory)

export default applyMiddleware(
  thunk,
  middleware,
  logger
)(createStore)(rootReducer, initialState, window.devToolsExtension && window.devToolsExtension())
