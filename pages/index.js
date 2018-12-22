import React from 'react'
import { connect } from 'react-redux'
import { startClock, serverRenderClock } from '../store'
import Reports from '../containers/reports'

class Index extends React.Component {
  render () {
    return <Reports />
  }
}

export default connect()(Index)
