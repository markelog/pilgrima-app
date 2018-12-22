import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReportsIfNeeded } from '../actions/reports'
import Chart from '../components/chart'

class Reports extends Component {
  static propTypes = {
    branch: PropTypes.string.isRequired,
    reports: PropTypes.array.object,
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
    return (<Chart reports={this.props.reports} />)
  }
}

const mapStateToProps = state => {
  const { branch, reportsByBranch } = state

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
