import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import CheckboxField from '../fields/CheckboxField'
import FormikField from '../fields/FormikField'
import DeleteModal from '../../containers/modals/DeleteModal'
import CommentModal from '../../containers/modals/CommentModal'
import Datetime from 'react-datetime'
import TaskSchema from '../../formValidations/tasks/taskForm'
import PropTypes from 'prop-types'

const TaskItem = ({ onMouseLeaveHandler,
                    moveTaskHigherHandler,
                    moveTaskLowerHandler,
                    task,
                    taskTitleClass,
                    checkboxOnClickHandler,
                    toggleDatePicker,
                    showTaskEditForm,
                    handleDelete,
                    hideDatePicker,
                    onChangeDatepickerHandler,
                    isDatePickerVisible,
                    onSubmitHandler,
                    showTaskFormButtons,
                    hideTaskEditForm,
                    comments,
                    isEditTaskFormVisible }) => (
  <div className="project-task" onMouseLeave={onMouseLeaveHandler}>
    { isEditTaskFormVisible ||
      <div className="project-task-item">
        <div className="project-task-actions project-task-priority">
          <span onClick={moveTaskHigherHandler}><Glyphicon glyph="menu-up" /></span>
          <span onClick={moveTaskLowerHandler}><Glyphicon glyph="menu-down" /></span>
        </div>
        <CheckboxField value={task.complete}
                       title={task.title}
                       className="flex-grow mb-0"
                       titleClass={taskTitleClass}
                       extraInfo={task.deadline_at}
                       onClickHandler={checkboxOnClickHandler} />
        <div className="no-shrink pt-5 project-task-actions">
          <CommentModal comments={comments} task={task}/>
          <span className="align-middle d-inline-block mb-5" onClick={toggleDatePicker}><Glyphicon glyph="time" /></span>
          <span className="align-middle d-inline-block mb-5" onClick={showTaskEditForm}><Glyphicon glyph="pencil" /></span>
          <DeleteModal deleteAction={handleDelete}/>
          <Datetime input={false}
            closeOnSelect={true}
            disableOnClickOutside={false}
            onBlur={hideDatePicker}
            onChange={onChangeDatepickerHandler}
            open={isDatePickerVisible}/>
        </div>
      </div>
    }

    { isEditTaskFormVisible &&
      <Formik
        initialValues={{ taskTitle: task.title }}
        validationSchema={TaskSchema}
        onSubmit={(values, actions) => {
          onSubmitHandler(values, actions)
        }}
      >
      {({ errors, touched, values, handleReset }) => (
        <Form className="project-task-edit-form">
          <div className="mb-20">
            <FormikField
              name="taskTitle"
              key={task.id}
              className="project-task-edit-field"
              onClickHandler={showTaskFormButtons}
              errors={errors.taskTitle}
              touched={touched.taskTitle}
              placeholder='Task title' />
            <div className="project-task-edit-btn">
              <Button type="submit" bsStyle="info" className="mb-5 mr-15">
                Save
              </Button>
              <Button
                bsStyle="default"
                className="mb-5 mr-15"
                onClick={
                  () => {
                    hideTaskEditForm()
                    handleReset()}}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      )}
      </Formik>
    }
</div>
)

TaskItem.propTypes = {
  onMouseLeaveHandler: PropTypes.func,
  moveTaskHigherHandler: PropTypes.func,
  moveTaskLowerHandler: PropTypes.func,
  checkboxOnClickHandler: PropTypes.func,
  task: PropTypes.object,
  taskTitleClass: PropTypes.string,
  toggleDatePicker: PropTypes.func,
  showTaskEditForm: PropTypes.func,
  handleDelete: PropTypes.func,
  hideDatePicker: PropTypes.func,
  onChangeDatepickerHandler: PropTypes.func,
  isDatePickerVisible: PropTypes.bool,
  isEditTaskFormVisible: PropTypes.bool,
  onSubmitHandler: PropTypes.func,
  showTaskFormButtons: PropTypes.func,
  hideTaskEditForm: PropTypes.func,
  comments: PropTypes.array,
  isEditTaskFormVisible: PropTypes.bool
}

export default TaskItem
