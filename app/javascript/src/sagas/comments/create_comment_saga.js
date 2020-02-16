import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstanceFormData as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* createComment(action) {
  try {
    const response = yield authorizedInstance().post(`/api/v1/tasks/${action.taskId}/comments`, action.data)
    const data = yield normalize(response.data)
    yield put({ type: TYPES.CREATE_COMMENT + TYPES.SUCCESS, taskId: action.taskId, data })
  } catch (error) {
    console.log(error)
    yield handleRequstError(error)
  }
}

export function* watchCreateComment() {
  yield takeEvery(TYPES.CREATE_COMMENT + TYPES.REQUEST, createComment)
}
