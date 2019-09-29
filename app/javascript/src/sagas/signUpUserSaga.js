import { put, takeEvery } from 'redux-saga/effects'
import * as TYPES from '../constants/types'
import axios from 'axios'

export function* signUpUser(action) {
  try {
    const response = yield axios.post('/api/v1/sign_up/', {
      email: action.login,
      password: action.password,
      password_confirmation: action.passwordConfirmation
    })
    yield localStorage.setItem('csrf_token', response.headers['x-csrf-token'])
    yield put({ type: TYPES.SIGN_UP_USER + TYPES.SUCCESS })
    yield action.history.push('/')
  } catch (error) {
    yield put({ type: TYPES.SIGN_UP_USER + TYPES.ERROR, hideErrors: false, message: error.response.data.errors[0].detail })
  }
}

export function* watchSignUpUser() {
  yield takeEvery(TYPES.SIGN_UP_USER + TYPES.REQUEST, signUpUser)
}
