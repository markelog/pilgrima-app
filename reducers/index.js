import { combineReducers } from 'redux'

import projects from './projects';
import reports from './reports';

const rootReducer = combineReducers({
  projects,
  reports
})

export default rootReducer;
