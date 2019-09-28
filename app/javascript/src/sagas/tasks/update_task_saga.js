import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* updateTask(action) {
  try {
    const response = yield authorizedInstance().put(`/api/v1/tasks/${action.id}`, {
      data: {
        attributes: action.data
      }
    })
    const data = yield normalize(response.data)
    yield put({ type: TYPES.UPDATE_TASK + TYPES.SUCCESS, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchUpdateTask() {
  yield takeEvery(TYPES.UPDATE_TASK + TYPES.REQUEST, updateTask)
}
