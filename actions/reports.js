import {API} from './constants';

export const REQUEST_REPORTS = 'REQUEST_REPORTS'
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS'

export const requestReports = (project, branch) => ({
  type: REQUEST_REPORTS,
  project,
  branch
})

export const receiveReports = (project, branch, reports) => {
  return ({
    type: RECEIVE_REPORTS,
    project,
    branch,
    reports,
    receivedAt: Date.now()
  })
}

const fetchReports = (project, branch) => dispatch => {
  dispatch(requestReports(project, branch));
  return fetch(`${API}/reports?repository=${project}&branch=${branch}`)
    .then(response => response.json())
    .then(reports => dispatch(receiveReports(project, branch, reports.payload)));
}

const shouldFetchReports = (state, project, branch) => {
  return true;
}

export const fetchReportsIfNeeded = (project, branch) => (dispatch, getState) => {
  if (shouldFetchReports(getState(), project, branch)) {
    return dispatch(fetchReports(project, branch))
  }
}
