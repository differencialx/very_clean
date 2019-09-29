import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentItemComponent from '../../components/comments/CommentItem'
import * as commentActions from '../../actions/actions'

class CommentItem extends Component {
  handleDeleteComment = () => {
    console.log(this.props)
    this.props.deleteComment(this.props.comment.id, this.props.comment.task_id)
  }

  render() {
    const { handleDeleteComment, props: { comment } } = this

    return(
      <CommentItemComponent comment={comment}
                            removeCommentHandler={handleDeleteComment} />
    )
  }
}

const mapDispatchToProps = {
  deleteComment: commentActions.deleteCommentRequest
}

export default connect(null, mapDispatchToProps)(CommentItem)
