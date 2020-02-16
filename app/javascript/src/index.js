/* eslint-env node */

require('webpack-icons-installer/bootstrap')
import React from 'react'
import { render } from 'react-dom'
import Main from './Main'
import SignUp from './containers/SignUp'
import SignIn from './containers/SignIn'
import PrivateRoute from './containers/PrivateRoute'
import ProjectsPage from './containers/projects/ProjectPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './scss/react-datetime.css'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger as createLoggerMiddleware } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import 'babel-polyfill'
import 'regenerator-runtime/runtime'
import reducer from './reducers'
import mainSaga from './sagas'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'

const isDevEnv = process.env.NODE_ENV === 'development'

const sagaMiddleware = createSagaMiddleware()

export const configureStore = () => {
  const loggerMiddleware = createLoggerMiddleware()
  const devMiddleware = isDevEnv ? [loggerMiddleware] : []
  return createStore(reducer, compose(applyMiddleware(sagaMiddleware, ...devMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f))
}

const store = configureStore()

sagaMiddleware.run(mainSaga)

const router = (
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Main>
          <Switch>
            <PrivateRoute exact path='/' component={ProjectsPage}/>
            <Route path="/sign_in" render={ props => <SignIn { ...props }/> }></Route>
            <Route path="/sign_up" render={ props => <SignUp { ...props } /> } ></Route>
          </Switch>
        </Main>
      </BrowserRouter>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
    </div>
  </Provider>
)

render(router, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextApplication = require('./Main').default
    render(<NextApplication />, document.getElementById('app'))
  })
}
