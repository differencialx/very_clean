import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* moveTaskHigher(action) {
  try {
    yield authorizedInstance().put(`/api/v1/tasks/${action.id}/move_higher`)
    const response = yield authorizedInstance().get(`/api/v1/projects/${action.projectId}/tasks`)
    const data = yield normalize(response.data)
    yield put({ type: TYPES.LOAD_TASKS + TYPES.SUCCESS, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchMoveTaskHigher() {
  yield takeEvery(TYPES.MOVE_TASK_HIGHER + TYPES.REQUEST, moveTaskHigher)
}
