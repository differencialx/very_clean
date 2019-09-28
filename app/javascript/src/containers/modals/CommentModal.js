import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as commentActions from '../../actions/actions'
import CommentModalComponent from '../../components/modals/CommentModal'
import CommentItem from '../../containers/comments/CommentItem'
import { pick, values, map } from 'lodash'

class CommentModal extends Component {
  state = {
    showModal: false
  }

  close = () => {
    this.setState({ showModal: false})
  }

  open = () => {
    this.setState({ showModal: true })
  }

  handleFileChange = (evt) => {
    this.setState({ file: evt.target.files[0] })
  }

  handleCreateComment = (values, { resetForm }) => {
    const formData = new FormData()
    formData.append('data[attributes][attachment]', values.file)
    formData.append('data[attributes][text]', values.commentText)
    this.props.createComment(this.props.task.id, formData)
    document.getElementById("comment_file").value = "";
    resetForm({ commentText: '' })
  }

  renderComment = (comment) => {
    return (
      <CommentItem comment={comment} key={comment.id} />
    )
  }

  render() {
    const {
      open,
      close,
      handleCreateComment,
      renderComment,
      state: {
        showModal
      },
      props: {
        loading,
        comments
      }
    } = this

    return (
      <CommentModalComponent
        openModalHandler={open}
        closeModalHandler={close}
        createCommentHandler={handleCreateComment}
        renderComment={renderComment}
        showModal={showModal}
        comments={comments}
        loading={loading}
      />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    comments: values(pick(state.entities.comments, props.task.comments.map(comment => comment.id))),
    loading: state.loading.commentLoading
  }
}

const mapDispatchToProps = {
  createComment: commentActions.createCommentRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
