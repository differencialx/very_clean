import React from 'react'
import { Button } from 'react-bootstrap'
import FormikField from '../fields/FormikField'
import ProjectSchema from '../../formValidations/projects/projectForm'
import { Formik, Form } from 'formik'
import PropTypes from 'prop-types'

const ProjectCreateForm = ({ handleSubmit, showProjectFormButtons, isProjectFormButtonsVisible, resetValue }) => (
  <Formik
    initialValues={{ projectName: '' }}
    validationSchema={ProjectSchema}
    onSubmit={(values, actions) => {
      handleSubmit(values, actions)
    }}
  >
  {({ errors, touched, resetForm }) => (
    <Form className="project-task-edit-form">
      <div className="mb-20">
        <FormikField
          name="projectName"
          errors={errors.projectName}
          touched={touched.projectName}
          onClickHandler={showProjectFormButtons}
          placeholder='Project name' />

        { isProjectFormButtonsVisible &&
          <div>
            <Button type="submit" bsStyle="primary" className="mb-15 mr-15">
              Create Project
            </Button>
            <Button bsStyle="default" className="mb-15 mr-15" onClick={function(event){ resetValue(); resetForm()}}>
              Cancel
            </Button>
          </div>
        }
      </div>
    </Form>
  )}
  </Formik>
)

ProjectCreateForm.propTypes = {
  handleSubmit: PropTypes.func,
  showProjectFormButtons: PropTypes.func,
  isProjectFormButtonsVisible: PropTypes.bool,
  resetValue: PropTypes.func
}

export default ProjectCreateForm
