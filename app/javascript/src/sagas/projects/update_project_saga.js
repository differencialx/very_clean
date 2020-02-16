import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* updateProject(action) {
  try {
    const response = yield authorizedInstance().put(`/api/v1/projects/${action.id}`, {
      data: {
        attributes: action.data
      }
    })
    const data = yield normalize(response.data)
    yield put({ type: TYPES.UPDATE_PROJECT + TYPES.SUCCESS, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchUpdateProject() {
  yield takeEvery(TYPES.UPDATE_PROJECT + TYPES.REQUEST, updateProject)
}
