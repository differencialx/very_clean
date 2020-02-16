import * as types from '../constants/types'

const initialState = {
  hideErrors: true,
  message: ''
}

function authFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_USER + types.ERROR:
    case types.SIGN_UP_USER + types.ERROR:
      return {
        ...state,
        hideErrors: action.hideErrors,
        message: action.message
      }
    case types.SIGN_IN_USER + types.SUCCESS:
    case types.SIGN_UP_USER + types.SUCCESS:
    case types.CLEAR_AUTH_FORM + types.SUCCESS:
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default authFormReducer
