import React, { Component } from 'react'
import ProjectCreateFormComponent from '../../components/projects/ProjectCreateForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pageActions from '../../actions/pageActions'
import * as projectActions from '../../actions/actions'

class ProjectCreateForm extends Component {
  handleReset = () => {
    this.props.hideProjectFormButtons()
  }

  handleSubmit = (values, { resetForm }) => {
    this.props.createProject({name: values.projectName})
    resetForm()
    this.handleReset()
  }

  render(){
    const {
      handleReset,
      handleSubmit,
      props: {
        showProjectFormButtons,
        pageState: {
          isProjectFormButtonsVisible
        }
      }
    } = this

    return (
      <ProjectCreateFormComponent isProjectFormButtonsVisible={isProjectFormButtonsVisible}
                                  showProjectFormButtons={showProjectFormButtons}
                                  resetValue={handleReset}
                                  handleSubmit={handleSubmit} />
    )
  }
}

function mapStateToProps(state) {
  return {
    pageState: state.pageState
  }
}

const mapDispatchToProps = {
  showProjectFormButtons: pageActions.showProjectFormButtons,
  hideProjectFormButtons: pageActions.hideProjectFormButtons,
  createProject: projectActions.createProjectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm)
