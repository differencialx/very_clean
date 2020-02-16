import { call, put, takeEvery } from 'redux-saga/effects'
import { getAuthorizedInstance as authorizedInstance } from '../../api/api'
import * as TYPES from '../../constants/types'
import { toastr } from 'react-redux-toastr'
import { handleRequstError } from '../../handlers/errorHandler'

export function* deleteComment(action) {
  try {
    yield authorizedInstance().delete(`/api/v1/comments/${action.id}`)
    yield put({ type: TYPES.REMOVE_COMMENT + TYPES.SUCCESS, commentId: action.id, taskId: action.taskId })
  } catch (error) {
    yield handleRequstError(error)
  }
}

export function* watchDeleteComment() {
  yield takeEvery(TYPES.REMOVE_COMMENT + TYPES.REQUEST, deleteComment)
}
