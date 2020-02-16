import React from 'react'
import { Button } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import FormikField from '../fields/FormikField'
import TaskSchema from '../../formValidations/tasks/taskForm'
import PropTypes from 'prop-types'

const TaskItemCreateForm = ({ handleSubmit,
                              isTaskFormButtonsVisible,
                              resetValue,
                              showTaskFormButtons }) => (
  <Formik
    initialValues={{ taskTitle: '' }}
    validationSchema={TaskSchema}
    onSubmit={(values, actions) => {
      handleSubmit(values, actions)
    }}
  >
  {({ errors, touched, handleReset }) => (
    <Form>
      <div className="mb-20">
        <FormikField
          name="taskTitle"
          className='project-task-edit-field'
          onClickHandler={showTaskFormButtons}
          errors={errors.taskTitle}
          touched={touched.taskTitle}
          placeholder='Task title' />

      { isTaskFormButtonsVisible &&
        <div className="project-task-edit-btn">
          <Button type="submit" bsStyle="info" className="mb-5 mr-15">
            Add Task
          </Button>
          <Button
            bsStyle="default"
            className="mb-5 mr-15"
            onClick={
              () => {
                resetValue()
                handleReset()}}>
            Cancel
          </Button>
        </div> }
      </div>
    </Form>
  )}
  </Formik>
)

TaskItemCreateForm.propTypes = {
  handleSubmit: PropTypes.func,
  isTaskFormButtonsVisible: PropTypes.bool,
  resetValue: PropTypes.func,
  showTaskFormButtons: PropTypes.func
}

export default TaskItemCreateForm
