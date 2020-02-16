import { call, put, takeEvery } from 'redux-saga/effects'
import normalize from 'jsonapi-normalizer'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* fetchProjects(action) {
  try {
    const response = yield authorizedInstance().get('/api/v1/projects/')
    const data = yield normalize(response.data)
    yield put({ type: TYPES.FETCH_PROJECTS + TYPES.SUCCESS, data })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchFetchProjects() {
  yield takeEvery(TYPES.FETCH_PROJECTS + TYPES.REQUEST, fetchProjects)
}
