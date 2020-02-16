import { put, takeEvery } from 'redux-saga/effects'
import * as TYPES from '../constants/types'
import axios from 'axios'

export function* signInUser(action) {
  try {
    const response = yield axios.post('/api/v1/sign_in/', {
      email: action.login,
      password: action.password
    })
    yield localStorage.setItem('csrf_token', response.headers['x-csrf-token'])
    yield put({ type: TYPES.SIGN_IN_USER + TYPES.SUCCESS })
    yield action.history.push('/')
  } catch (error) {
    console.log(error)
    yield put({ type: TYPES.SIGN_IN_USER + TYPES.ERROR, hideErrors: false, message: error.response.data.errors[0].detail })
  }
}

export function* watchSignInUser() {
  yield takeEvery(TYPES.SIGN_IN_USER + TYPES.REQUEST, signInUser)
}
