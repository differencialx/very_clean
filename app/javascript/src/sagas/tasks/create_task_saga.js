import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* createTask(action) {
  try {
    const response = yield authorizedInstance().post(`/api/v1/projects/${action.projectId}/tasks`, {
      data: {
        attributes: action.data
      }
    })
    const data = yield normalize(response.data)
    yield put({ type: TYPES.CREATE_TASK + TYPES.SUCCESS, projectId: action.projectId, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchCreateTask() {
  yield takeEvery(TYPES.CREATE_TASK + TYPES.REQUEST, createTask)
}
