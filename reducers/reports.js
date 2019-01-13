import { combineReducers } from 'redux'
import {
  REQUEST_REPORTS, RECEIVE_REPORTS
} from '../actions/reports'


const defaultState = {
  master: {
    branch: 'master',

    isFetching: false,
    items: undefined
  }
};

const branch = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return 'master'
  }
}

const reportsByBranch = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_REPORTS:
      return {
        branch: 'master',

        [action.branch]: {
          isFetching: true,
          items: undefined
        }
      };
    case RECEIVE_REPORTS:
      return {
        branch: 'master',

        [action.branch]: {
          isFetching: false,
          items: action.reports
        }
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  branch,
  reportsByBranch
})

export default rootReducer;
