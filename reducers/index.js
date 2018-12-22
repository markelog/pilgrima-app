import { combineReducers } from 'redux'
import {
  REQUEST_REPORTS, RECEIVE_REPORTS
} from '../actions/reports'

const branch = (state = 'core/prerelease', action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reportsByBranch = (state = 'core/prerelease', action) => {
  switch (action.type) {
    case REQUEST_REPORTS:
      return {
        [action.branch]: {
          isFetching: true,
          items: {}
        }
      };
    case RECEIVE_REPORTS:
      return {
        [action.branch]: {
          isFetching: false,
          items: action.reports
        }
      };
    default:
      return {
        master: {
          isFetching: false,
          items: {}
        }
      }
  }
}

const rootReducer = combineReducers({
  branch,
  reportsByBranch
})

export default rootReducer;
