import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

const CommentItem = ({ comment, removeCommentHandler }) => (
  <div className="pb-5">
    <div className="divider" />
    <div className="pt-15 pr-15 pb-5 pl-15">
      <div>
        <span className="mr-15 in-grey-200">{moment(comment.created_at).format("DD/MM/YYYY")}</span>
        <span onClick={removeCommentHandler} ><Glyphicon glyph="trash" /></span>
      </div>
      <p className="mb-5">{comment.text}</p>
      <a href={comment.attachment.url} target="_blank"><img src={comment.attachment} /></a>
    </div>
  </div>
)

CommentItem.propTypes = {
  comment: PropTypes.object,
  removeCommentHandler: PropTypes.func
}

export default CommentItem
