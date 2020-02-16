import React from 'react'
import PropTypes from 'prop-types'
import ProjectItem from './ProjectItem'

class ProjectsList extends React.Component {
  renderProject(project) {
    return (
      <ProjectItem project={project} key={project.id}/>
    )
  }

  render() {
    return (
      <div>
        { this.props.projects.map(this.renderProject) }
      </div>
    )
  }
}

export default ProjectsList
