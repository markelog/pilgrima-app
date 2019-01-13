import { combineReducers } from 'redux'
import {
  REQUEST_PROJECTS, RECEIVE_PROJECTS
} from '../actions/projects'

const defaultState = {
  isFetching: false,
  items: []
};

const projects = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return {
        isFetching: true,
        items: []
      }
    case RECEIVE_PROJECTS:
      return {
        isFetching: false,
        items: action.projects
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  projects
})

export default rootReducer;
