import React from 'react'
import { connect } from 'react-redux'
import Projects from '../containers/projects'

class Index extends React.Component {
  render () {
    return <Projects />
  }
}

export default connect()(Index)
