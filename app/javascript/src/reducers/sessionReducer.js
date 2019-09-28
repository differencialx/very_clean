import * as types from '../constants/types'

export default function sessionReducer(state = !!localStorage.jwt, action) {
  switch(action.type) {
    case types.SIGN_IN_USER + types.SUCCESS:
    case types.SIGN_UP_USER + types.SUCCESS:
    case types.SIGN_OUT_USER + types.SUCCESS:
      return !!localStorage.jwt
    default:
      return state;
  }
}
