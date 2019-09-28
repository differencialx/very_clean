import React, { Component } from 'react'
import TaskItemCreateFormComponent from '../../components/tasks/TaskItemCreateForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActions from '../../actions/actions'

class TaskItemCreateForm extends Component {
  state = {
    isTaskFormButtonsVisible: false
  }

  handleReset = () => {
    this.hideTaskFormButtons()
  }

  handleSubmit = (values, { resetForm }) => {
    this.props.createTask(this.props.projectId, {title: values.taskTitle})
    resetForm()
    this.handleReset()
  }

  showTaskFormButtons = () => {
    this.setState({ isTaskFormButtonsVisible: true })
  }

  hideTaskFormButtons = () => {
    this.setState({ isTaskFormButtonsVisible: false })
  }

  render(){
    const {
      showTaskFormButtons,
      handleReset,
      handleSubmit,
      state: {
        isTaskFormButtonsVisible,
      }
    } = this

    return (
      <TaskItemCreateFormComponent isTaskFormButtonsVisible={isTaskFormButtonsVisible}
                                   showTaskFormButtons={showTaskFormButtons}
                                   resetValue={handleReset}
                                   handleSubmit={handleSubmit}/>
    )
  }
}

const mapDispatchToProps = {
  createTask: taskActions.createTaskRequest
}

export default connect(null, mapDispatchToProps)(TaskItemCreateForm)
