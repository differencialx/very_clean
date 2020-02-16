import React from 'react'
import classNames from 'classnames'
import { Button, Glyphicon } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import FormikField from '../fields/FormikField'
import DeleteModal from '../../containers/modals/DeleteModal'
import TaskList from '../../containers/tasks/TaskList'
import ProjectSchema from '../../formValidations/projects/projectForm'
import PropTypes from 'prop-types'

const ProjectItem = ({ projectClass,
                       project,
                       onSubmitHandler,
                       cancelOnClickHandler,
                       projectInfoClass,
                       projectToggleHandler,
                       editOnClickHandler,
                       deleteOnClickHandler,
                       tasks }) => (
  <div className={classNames('project', projectClass)}>
    <div className="project-edit">
      <Formik
        initialValues={{ projectName: project.name }}
        validationSchema={ProjectSchema}
        onSubmit={(values, actions) => {
          onSubmitHandler(values, actions)
        }}
      >
      {({ errors, touched, handleReset }) => (
        <Form>
          <div className="mb-20">
            <FormikField
              name="projectName"
              errors={errors.projectName}
              touched={touched.projectName}
              placeholder='Project name' />

            <Button type="submit" bsStyle="primary" className="mb-5 mr-5">
              Save
            </Button>
            <Button bsStyle="default"
                    className="mb-5 mr-5"
                    onClick={
                      function(event){
                        cancelOnClickHandler()
                        handleReset()
                    }}>Cancel</Button>
          </div>
        </Form>
      )}
      </Formik>
    </div>
    <div className={classNames('project-info', projectInfoClass)}>
      <div className="project-info__header">
        <p className="project-info__title" onClick={projectToggleHandler}>
          <span className="project-info__title-icon  icon icon-arrow-up" />
          {project.name}
        </p>
        <div className="project-info__actions">
          <span className="align-middle d-inline-block mb-5 mr-5" onClick={editOnClickHandler}><Glyphicon glyph="pencil" /></span>
          <DeleteModal deleteAction={deleteOnClickHandler}/>
        </div>
      </div>
      <div className="project-info__body">
        <TaskList tasks={tasks} projectId={project.id}/>
      </div>
    </div>
  </div>
)

ProjectItem.propTypes = {
  projectClass: PropTypes.string,
  project: PropTypes.object,
  onSubmitHandler: PropTypes.func,
  cancelOnClickHandler: PropTypes.func,
  projectInfoClass: PropTypes.string,
  projectToggleHandler: PropTypes.func,
  editOnClickHandler: PropTypes.func,
  deleteOnClickHandler: PropTypes.func,
  tasks: PropTypes.array
}

export default ProjectItem
