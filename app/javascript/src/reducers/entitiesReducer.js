import * as TYPES from '../constants/types'
import merge from "lodash/merge";
import concat from "lodash/concat";
import filter from "lodash/filter";

const initialState = {
  projects: {},
  tasks: {},
  comments: {}
}

function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_PROJECTS + TYPES.SUCCESS:
      return  {...state, ...action.data.entities}
    case TYPES.CREATE_PROJECT + TYPES.SUCCESS:
      return merge({}, state, action.data.entities)
    case TYPES.UPDATE_PROJECT + TYPES.SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          ...action.data.entities.projects
        }
      }
    case TYPES.REMOVE_PROJECT + TYPES.SUCCESS:
      let newProjectState = Object.assign({}, state.projects)
      delete newProjectState[action.projectId]
      return {
        ...state,
        projects: {
          ...newProjectState
        }
      }
    case TYPES.CREATE_TASK + TYPES.SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
            ...state.projects[action.projectId],
            tasks: concat(state.projects[action.projectId].tasks, [{ id: action.data.result.tasks.shift(), type: 'task' }])
          }
        },
        tasks: merge({}, state.tasks, action.data.entities.tasks)
      }
    case TYPES.UPDATE_TASK + TYPES.SUCCESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.data.entities.tasks
        }
      }
    case TYPES.REMOVE_TASK + TYPES.SUCCESS:
      let newTasksState = Object.assign({}, state.tasks)
      delete newTasksState[action.taskId]
      return {
        ...state,
        projects: {
          ...state.projects,
          [action.projectId]: {
            ...state.projects[action.projectId],
            tasks: filter(state.projects[action.projectId].tasks, (task) => task.id !== action.taskId )
          }
        },
        tasks: newTasksState
      }
    case TYPES.LOAD_TASKS + TYPES.SUCCESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.data.entities.tasks
        }
      }
    case TYPES.REMOVE_COMMENT + TYPES.SUCCESS:
      let newCommentsState = Object.assign({}, state.comments)
      delete newCommentsState[action.commentId]
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            comments: filter(state.tasks[action.taskId].comments, (comment) => comment.id !== action.commentId )
          }
        },
        comments: newCommentsState
      }
    case TYPES.CREATE_COMMENT + TYPES.SUCCESS:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            comments: concat(state.tasks[action.taskId].comments, [{ id: action.data.result.comments.shift(), type: 'comment' }])
          }
        },
        comments: merge({}, state.comments, action.data.entities.comments)
      }
    case TYPES.SIGN_OUT_USER + TYPES.SUCCESS:
      return { ...state, ...initialState }
    default:
      return state
  }
}

export default entitiesReducer
