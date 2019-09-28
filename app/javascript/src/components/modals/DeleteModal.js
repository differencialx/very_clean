import React from 'react'
import {
  Modal,
  Button,
  Glyphicon
} from 'react-bootstrap'
import PropTypes from 'prop-types'

  const DeleteModal = ({ opemModalHandler, showModalHandler, deleteHandler, closeHideHandler }) => (
  <div className="align-middle d-inline-block mb-5">
    <span onClick={opemModalHandler}>
      <Glyphicon glyph="trash" />
    </span>
    <Modal
      bsSize="small"
      show={showModalHandler}
      onHide={closeHideHandler}
    >
      <Modal.Header closeButton>
        <Modal.Title className="in-black">Delete project</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <p className="mb-10">
          Do you really want to delete Name project?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={deleteHandler}>Delete</Button>
        <Button bsStyle="default" onClick={closeHideHandler}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  </div>
)

DeleteModal.propTypes = {
  opemModalHandler: PropTypes.func,
  showModalHandler: PropTypes.bool,
  closeHideHandler: PropTypes.func,
  deleteHandler: PropTypes.func
}

export default DeleteModal
