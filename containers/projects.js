import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { fetchProjects} from '../actions/projects';

import ProjectList from '../components/project-list';

class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProjects())
  }

  render() {
    return <ProjectList projects={this.props.projects} />;
  }
}

const mapStateToProps = state => {
  const { projects: prjs } = state.projects;
  const {
    isFetching,
    items: projects
  } = prjs;

  return {
    projects,
    isFetching
  }
}

export default connect(mapStateToProps)(Projects)
