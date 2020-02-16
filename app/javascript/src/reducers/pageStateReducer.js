import * as types from '../constants/types'

const initialState = {
  isProjectFormButtonsVisible: false
}

function pageStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_PROJECT_FORM_BUTTONS:
    case types.HIDE_PROJECT_FORM_BUTTONS:
      return { ...state, isProjectFormButtonsVisible: action.visibility }
    default:
      return state
  }
}

export default pageStateReducer
