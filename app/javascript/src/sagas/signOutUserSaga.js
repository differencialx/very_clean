import { put, takeEvery } from 'redux-saga/effects'
import * as TYPES from '../constants/types'

export function* signOutUser() {
  try {
    yield localStorage.remove('csrf_token')
    yield put({ type: TYPES.SIGN_OUT_USER + TYPES.SUCCESS })
  } catch (error) {
    console.log(error)
  }
}

export function* watchSignOutUser() {
  yield takeEvery(TYPES.SIGN_OUT_USER, signOutUser)
}
