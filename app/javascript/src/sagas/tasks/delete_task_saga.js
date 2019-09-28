import { call, put, takeEvery } from 'redux-saga/effects'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { toastr } from 'react-redux-toastr'
import { handleRequstError } from '../../handlers/errorHandler'

export function* deleteTask(action) {
  try {
    yield authorizedInstance().delete(`/api/v1/tasks/${action.id}`)
    yield put({ type: TYPES.REMOVE_TASK + TYPES.SUCCESS, taskId: action.id, projectId: action.projectId })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchDeleteTask() {
  yield takeEvery(TYPES.REMOVE_TASK + TYPES.REQUEST, deleteTask)
}
