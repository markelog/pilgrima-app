import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withScreenSize } from '@vx/responsive';

import Background from '../components/background';
import Size from '../components/size';

import { fetchReportsIfNeeded } from '../actions/reports'
import Chart from '../components/chart-test'

class Reports extends Component {
  static propTypes = {
    branch: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    reports: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    screenWidth: PropTypes.number.isRequired,
    screenHeight: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { dispatch, project, branch } = this.props;
    dispatch(fetchReportsIfNeeded(project, branch))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.branch === this.props.branch) {
      return
    }

    const { dispatch, project, branch } = nextProps
    dispatch(fetchReportsIfNeeded(project, branch))
  }

  render() {
    const { reports, screenWidth, screenHeight } = this.props;

    if (reports === undefined) {
      return null;
    }

    const width = 500;
    const height = 500;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    return (
      // <div className="app">
      //   <Background width={screenWidth} height={screenHeight} />
      //   <div className="center">
      //     <Size data={reports} width={screenWidth} height={screenHeight} />
      //   </div>
      //   <style jsx>{`
      //     .app,
      //     .center {
      //       position: absolute;
      //       top: 0;
      //       left: 0;
      //       right: 0;
      //       bottom: 0;
      //       overflow: hidden;
      //       display: flex;
      //       font-family: arial;
      //       flex-direction: column;
      //     }
      //     .disclaimer {
      //       margin-top: 35px;
      //       font-size: 11px;
      //       color: white;
      //       opacity: 0.4;
      //     }
      //     .center {
      //       align-items: center;
      //       justify-content: center;
      //     }
      //   `}</style>

        <Chart width={width} height={height} margin={margin} />)
      // </div>)

    // return (<Chart reports={reports} />)
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

export default connect(mapStateToProps)(withScreenSize(Reports))
