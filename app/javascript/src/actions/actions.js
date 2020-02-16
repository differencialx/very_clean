import * as types from '../constants/types'

export const fetchProjectsRequest = () => (
  { type: types.FETCH_PROJECTS + types.REQUEST }
)

export const createProjectRequest = (data) => (
  { type: types.CREATE_PROJECT + types.REQUEST, data }
)

export const updateProjectRequest = (id, data) => (
  { type: types.UPDATE_PROJECT + types.REQUEST, id, data }
)

export const deleteProjectRequest = (id) => (
  { type: types.REMOVE_PROJECT + types.REQUEST, id }
)

export const createTaskRequest = (projectId, data) => (
  { type: types.CREATE_TASK + types.REQUEST, projectId, data }
)

export const updateTaskRequest = (id, data) => (
  { type: types.UPDATE_TASK + types.REQUEST, id, data }
)

export const deleteTaskRequest = (id, projectId) => (
  { type: types.REMOVE_TASK + types.REQUEST, id, projectId }
)

export const moveTaskHigherRequest = (id, projectId) => (
  { type: types.MOVE_TASK_HIGHER + types.REQUEST, id, projectId }
)

export const moveTaskLowerRequest = (id, projectId) => (
  { type: types.MOVE_TASK_LOWER + types.REQUEST, id, projectId }
)

export const createCommentRequest = (taskId, data) => (
  { type: types.CREATE_COMMENT + types.REQUEST, taskId, data }
)

export const deleteCommentRequest = (id, taskId) => (
  { type: types.REMOVE_COMMENT + types.REQUEST, id, taskId }
)

export const signInUserRequest = ({ login, password }, history) => (
  { type: types.SIGN_IN_USER + types.REQUEST, login, password, history }
)

export const signUpUserRequest = ({ login, password, passwordConfirmation}, history) => (
  { type: types.SIGN_UP_USER + types.REQUEST, login, password, passwordConfirmation, history }
)

export const signOutUser = () => (
  { type: types.SIGN_OUT_USER }
)

export const clearAuthForm = () => (
  { type: types.CLEAR_AUTH_FORM + types.SUCCESS }
)
