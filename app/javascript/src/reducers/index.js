import { combineReducers } from 'redux'

import entitiesReducer from './entitiesReducer'
import pageStateReducer from './pageStateReducer'
import sessionReducer from './sessionReducer'
import authFormReducer from './authFormReducer'
import loadingReducer from './loadingReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducer = combineReducers(
  {
    pageState: pageStateReducer,
    entities: entitiesReducer,
    session: sessionReducer,
    authForm: authFormReducer,
    toastr: toastrReducer,
    loading: loadingReducer
  }
)

export default reducer
