import { API } from './constants';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'

const requestProjects = branch => ({
  type: REQUEST_PROJECTS
})

const receiveProjects = (projects) => {
  return ({
    type: RECEIVE_PROJECTS,
    projects,
    receivedAt: Date.now()
  })
}

export const fetchProjects = () => dispatch => {
  dispatch(requestProjects())
  return fetch(`${API}/projects`)
    .then(response => response.json())
    .then(reports => dispatch(receiveProjects(reports.payload)));
}
