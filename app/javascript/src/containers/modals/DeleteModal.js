import React, { Component } from 'react'
import {
  Modal,
  Button,
  Glyphicon
} from 'react-bootstrap'
import DeleteModalComponent from '../../components/modals/DeleteModal'

class DeleteModal extends Component {
  state = { showModal: false }

  close = () => {
    this.setState({ showModal: false})
  }

  open = () => {
    this.setState({ showModal: true })
  }

  handleDelete = () => {
    this.props.deleteAction()
    this.close()
  }

  render() {
    const { open, close, handleDelete, state: { showModal } } = this

    return (
      <DeleteModalComponent opemModalHandler={open}
                            closeHideHandler={close}
                            deleteHandler={handleDelete}
                            showModalHandler={showModal} />
    )
  }
}

export default DeleteModal
