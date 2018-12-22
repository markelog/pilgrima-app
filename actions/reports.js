export const REQUEST_REPORTS = 'REQUEST_REPORTS'
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS'

const api = 'http://localhost:8080';

export const requestReports = branch => ({
  type: REQUEST_REPORTS,
  branch
})

export const receiveReports = (branch, reports) => {
  return ({
    type: RECEIVE_REPORTS,
    branch,
    reports,
    receivedAt: Date.now()
  })
}

const fetchReports = branch => dispatch => {
  dispatch(requestReports(branch))
  return fetch(`${api}/reports?repository=github.com/markelog/adit&branch=${branch}`)
    .then(response => response.json())
    .then(reports => dispatch(receiveReports(branch, reports.payload)))
}

const shouldFetchReports = (state, reports) => {
  return true;
  const posts = state.postsByBranch[reports]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchReportsIfNeeded = branch => (dispatch, getState) => {
  if (shouldFetchReports(getState(), branch)) {
    return dispatch(fetchReports(branch))
  }
}
