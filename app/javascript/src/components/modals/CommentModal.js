import React from 'react'
import { Modal, Button, Glyphicon } from 'react-bootstrap'
import Loader from 'react-loader'
import { Formik, Form } from 'formik'
import FormikField from '../fields/FormikField'
import CommentSchema from '../../formValidations/comments/commentForm'
import PropTypes from 'prop-types'

const CommentModal = ({ showModal, openModalHandler, comments, closeModalHandler, createCommentHandler, loading, renderComment }) => (
  <div className="align-middle d-inline-block mb-5">
    <span onClick={openModalHandler}>
      {comments.length || ''} <Glyphicon glyph="comment" />
    </span>
    <Modal bsSize="small" show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title className="in-black">Add comment</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{ commentText: '', file: '' }}
          validationSchema={CommentSchema}
          onSubmit={(values, actions) => {
            createCommentHandler(values, actions)
          }}
        >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Modal.Body className="pb-5">
              <FormikField type='text' component='textarea' name='commentText' placeholder="Enter Your Comment" />
              {errors.commentText && touched.commentText ? (
                <div className='alert alert-danger'>{errors.commentText}</div>
              ) : null}
              <input id='comment_file' name="file" type="file" onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }} />
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button bsStyle="primary" type='submit'>Save</Button>
              <Button bsStyle="default" onClick={closeModalHandler}>Cancel</Button>
            </Modal.Footer>
          </Form>
        )}
        </Formik>
        <Loader loaded={!loading}/>
        { comments.map(renderComment) }
    </Modal>

  </div>
)

CommentModal.propTypes = {
  openModalHandler: PropTypes.func,
  comments: PropTypes.array,
  closeModalHandler: PropTypes.func,
  createCommentHandler: PropTypes.func,
  loading: PropTypes.bool,
  renderComment: PropTypes.func,
  showModal: PropTypes.bool
}

export default CommentModal
