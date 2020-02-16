import * as types from '../constants/types'

const initialState = {
  commentLoading: false,
  projectLoading: false
}

export default function loadingReducer(state = initialState, action) {
  switch(action.type) {
    case types.CREATE_COMMENT + types.REQUEST:
    case types.REMOVE_COMMENT + types.REQUEST:
      return { ...state, commentLoading: true }
    case types.FETCH_PROJECTS + types.REQUEST:
      return { ...state, projectLoading: true }
    case types.CREATE_COMMENT + types.SUCCESS:
    case types.REMOVE_COMMENT + types.SUCCESS:
      return { ...state, commentLoading: false }
    case types.FETCH_PROJECTS + types.SUCCESS:
      return { ...state, projectLoading: false }
    default:
      return state;
  }
}
