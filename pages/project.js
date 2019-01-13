import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'next/router'

import Reports from '../containers/reports'

const Project = withRouter((props) => {
  const {project} = props;

  return <Reports project={project} />
})

export default connect()(Project)
