import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger as createLoggerMiddleware } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import 'babel-polyfill'
import 'regenerator-runtime/runtime'
import reducer from '../reducers'
import mainSaga from '../sagas'

const isDevEnv = process.env.NODE_ENV === 'development'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
  const loggerMiddleware = createLoggerMiddleware()
  const devMiddleware = isDevEnv ? [loggerMiddleware] : []
  return createStore(reducer, compose(applyMiddleware(sagaMiddleware, ...devMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f))
}

sagaMiddleware.run(mainSaga)
