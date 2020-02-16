import * as Yup from 'yup'

const TaskSchema = Yup.object().shape({
  taskTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export default TaskSchema
