import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReportsIfNeeded } from '../actions/reports'
import Chart from '../components/chart'

class Reports extends Component {
  static propTypes = {
    branch: PropTypes.string.isRequired,
    reports: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, branch } = this.props;
    dispatch(fetchReportsIfNeeded(branch))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.branch !== this.props.branch) {
      const { dispatch, branch } = nextProps
      dispatch(fetchReportsIfNeeded(branch))
    }
  }

  render() {
    const { reports } = this.props;

    if (reports === undefined) {
      return null;
    }

    return (<Chart reports={reports} />)
  }
}

const mapStateToProps = state => {
  const { branch = 'master', reportsByBranch } = state.reports;

  const {
    isFetching,
    items: reports
  } = reportsByBranch[branch] || {
    isFetching: true,
    items: []
  }

  return {
    branch,
    reports,
    isFetching,
  }
}

export default connect(mapStateToProps)(Reports)
