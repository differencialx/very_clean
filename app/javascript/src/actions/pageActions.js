import * as types from '../constants/types'

export function showProjectFormButtons() {
  return { type: types.SHOW_PROJECT_FORM_BUTTONS, visibility: true }
}

export function hideProjectFormButtons() {
  return { type: types.HIDE_PROJECT_FORM_BUTTONS, visibility: false }
}

export function showTaskFormButtons() {
  return { type: types.SHOW_TASK_FORM_BUTTONS, visibility: true }
}

export function hideTaskFormButtons() {
  return { type: types.HIDE_TASK_FORM_BUTTONS, visibility: false }
}
