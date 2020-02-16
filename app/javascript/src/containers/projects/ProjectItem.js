import React, { Component } from 'react'
import ProjectItemComponent from '../../components/projects/ProjectItem'
import * as projectActions from '../../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pick, values, map } from 'lodash'

class ProjectItem extends Component {
  state = {
    open: false,
    projectInfoClass: '',
    projectClass: ''
  }

  componentDidMount() {
    this.setState({ projectName: this.props.project.name })
  }

  toggle = () => {
    if(this.state.open) {
      this.setState({ projectInfoClass: '', open: false })
    } else {
      this.setState({ projectInfoClass: 'open', open: true })
    }
  }

  edit = () => {
    this.setState({ projectClass: 'edit' })
    if(this.state.open) {
      this.setState({ projectInfoClass: '', open: false })
    }
  }

  closeEdit = () => {
    this.setState({ projectClass: '' })
  }

  handleSubmit = (values, { resetForm }) => {
    this.props.updateProject(this.props.project.id, { name: values.projectName })
    resetForm({ projectName: values.projectName })
    this.closeEdit()
  }

  removeProject = () => {
    this.props.deleteProject(this.props.project.id, this.props.index)
  }

  render(){
    const {
      handleSubmit,
      closeEdit,
      toggle,
      edit,
      removeProject,
      props: {
        project,
        tasks
      },
      state: {
        projectClass,
        projectInfoClass
      }
    } = this

    return(
      <ProjectItemComponent projectClass={projectClass}
                            projectInfoClass= {projectInfoClass}
                            project={project}
                            tasks={tasks}
                            onSubmitHandler={handleSubmit}
                            cancelOnClickHandler={closeEdit}
                            projectToggleHandler={toggle}
                            editOnClickHandler={edit}
                            deleteOnClickHandler={removeProject} />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    tasks: values(pick(state.entities.tasks, props.project.tasks.map(task => task.id)))
  }
}

const mapDispatchToProps = {
  updateProject: projectActions.updateProjectRequest,
  deleteProject: projectActions.deleteProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem)
