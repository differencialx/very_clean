import * as Yup from 'yup'

const CommentSchema = Yup.object().shape({
  commentText: Yup.string()
    .required('Required')
});

export default CommentSchema
