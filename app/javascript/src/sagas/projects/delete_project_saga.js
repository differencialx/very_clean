import { call, put, takeEvery } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { handleRequstError } from '../../handlers/errorHandler'

export function* deleteProject(action) {
  try {
    yield authorizedInstance().delete(`/api/v1/projects/${action.id}`)
    yield put({ type: TYPES.REMOVE_PROJECT + TYPES.SUCCESS, projectId: action.id })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchDeleteProject() {
  yield takeEvery(TYPES.REMOVE_PROJECT + TYPES.REQUEST, deleteProject)
}
