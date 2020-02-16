import { all, takeLatest } from 'redux-saga/effects'

import * as TYPES from './constants/types'
import * as actions from './actions/actions'
import { watchFetchProjects } from './sagas/projects/fetch_projects_saga'
import { watchCreateProject } from './sagas/projects/create_project_saga'
import { watchUpdateProject } from './sagas/projects/update_project_saga'
import { watchDeleteProject } from './sagas/projects/delete_project_saga'
import { watchCreateTask } from './sagas/tasks/create_task_saga'
import { watchUpdateTask } from './sagas/tasks/update_task_saga'
import { watchDeleteTask } from './sagas/tasks/delete_task_saga'
import { watchMoveTaskHigher } from './sagas/tasks/move_task_higher_saga'
import { watchMoveTaskLower } from './sagas/tasks/move_task_lower_saga'
import { watchCreateComment } from './sagas/comments/create_comment_saga'
import { watchDeleteComment } from './sagas/comments/delete_comment_saga'
import { watchSignInUser } from './sagas/signInUserSaga'
import { watchSignOutUser } from './sagas/signOutUserSaga'
import { watchSignUpUser } from './sagas/signUpUserSaga'

function* mainSaga() {
  yield all([
    watchFetchProjects(),
    watchCreateProject(),
    watchUpdateProject(),
    watchDeleteProject(),
    watchCreateTask(),
    watchUpdateTask(),
    watchDeleteTask(),
    watchMoveTaskHigher(),
    watchMoveTaskLower(),
    watchCreateComment(),
    watchDeleteComment(),
    watchSignInUser(),
    watchSignOutUser(),
    watchSignUpUser()
  ])
}

export default mainSaga
