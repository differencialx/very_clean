import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskItemComponent from '../../components/tasks/TaskItem'
import * as taskActions from '../../actions/actions'

class TaskItem extends Component {
  state = {
    isEditTaskFormVisible: false,
    isDatePickerVisible: false,
    complete: this.props.task.completed,
    taskTitleClass: this.props.task.completed === true ? 'project-task-done' : ''
  }

  handleDelete = () => {
    this.props.deleteTask(this.props.task.id, this.props.projectId)
  }

  showTaskEditForm = () => {
    this.setState({ isEditTaskFormVisible: true })
  }

  hideTaskEditForm = () => {
    this.setState({ isEditTaskFormVisible: false })
  }

  moveTaskHigherHandler = () => {
    this.props.moveTaskHigher(this.props.task.id, this.props.task.project_id)
  }

  moveTaskLowerHandler = () => {
    this.props.moveTaskLower(this.props.task.id, this.props.task.project_id)
  }

  handleMarkTask = (evt) => {
    console.log()
    this.props.updateTask(this.props.task.id, { completed: evt.target.checked })
    this.setState({ taskTitleClass: this.state.taskTitleClass == '' ? 'project-task-done' : '' })
  }

  handleDatepickerOnChange = (evt) => {
    this.props.updateTask(this.props.task.id, { deadline_at: evt.format('MMMM Do YYYY, h:mm:ss a') })
    this.toggleDatePicker()
  }

  handleOnSubmit = (values, { resetForm }) => {
    this.props.updateTask(this.props.task.id, { name: values.taskTitle })
    resetForm({ taskTitle: values.taskTitle })
    this.hideTaskEditForm()
  }

  toggleDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible })
  }

  handleMouseLeave = (evt) => {
    this.setState({ isDatePickerVisible: false })
  }

  render() {
    const {
      moveTaskHigherHandler,
      moveTaskLowerHandler,
      handleMouseLeave,
      showTaskEditForm,
      hideTaskEditForm,
      handleOnSubmit,
      handleDelete,
      toggleDatePicker,
      handleMarkTask,
      handleDatepickerOnChange,
      state: {
        taskTitleClass,
        complete,
        isEditTaskFormVisible,
        isDatePickerVisible
      },
      props: {
        task
      }
    } = this

    return(
      <TaskItemComponent task={task}
        moveTaskHigherHandler={moveTaskHigherHandler}
        moveTaskLowerHandler={moveTaskLowerHandler}
        onMouseLeaveHandler={handleMouseLeave}
        taskTitleClass={taskTitleClass}
        compelteValue={complete}
        showTaskEditForm={showTaskEditForm}
        hideTaskEditForm={hideTaskEditForm}
        onSubmitHandler={handleOnSubmit}
        handleDelete={handleDelete}
        isEditTaskFormVisible={isEditTaskFormVisible}
        isDatePickerVisible={isDatePickerVisible}
        toggleDatePicker={toggleDatePicker}
        checkboxOnClickHandler={handleMarkTask}
        onChangeDatepickerHandler={handleDatepickerOnChange}
      />
    )
  }
}

const mapDispatchToProps = {
  deleteTask: taskActions.deleteTaskRequest,
  updateTask: taskActions.updateTaskRequest,
  moveTaskHigher: taskActions.moveTaskHigherRequest,
  moveTaskLower: taskActions.moveTaskLowerRequest
}

export default connect(null, mapDispatchToProps)(TaskItem)
