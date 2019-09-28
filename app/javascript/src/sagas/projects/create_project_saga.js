import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import * as TYPES from '../../constants/types'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import { handleRequstError } from '../../handlers/errorHandler'

export function* createProject(action) {
  try {
    const response = yield authorizedInstance().post('/api/v1/projects/', {
      data: {
        attributes: action.data
      }
    })
    const data = yield normalize(response.data)
    yield put({ type: TYPES.CREATE_PROJECT + TYPES.SUCCESS, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchCreateProject() {
  yield takeEvery(TYPES.CREATE_PROJECT + TYPES.REQUEST, createProject)
}
