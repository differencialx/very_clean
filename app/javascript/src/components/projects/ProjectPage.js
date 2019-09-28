import React from 'react'
import { Col } from 'react-bootstrap'
import ProjectsList from '../../containers/projects/ProjectList'
import ProjectCreateForm from '../../containers/projects/ProjectCreateForm'
import Loader from 'react-loader'
import PropTypes from 'prop-types'

const ProjectItem = ({ loading, projects }) => (
  <div className="row">
    <Col sm={8} smOffset={2}>
      <Loader loaded={!loading}/>
      <h2>Projects</h2>
      <ProjectsList projects={projects} />
      <ProjectCreateForm />
    </Col>
  </div>
)

ProjectItem.propTypes = {
  loading: PropTypes.bool,
  projects: PropTypes.array
}

export default ProjectItem
