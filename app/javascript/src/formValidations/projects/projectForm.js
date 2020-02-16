import * as Yup from 'yup'

const ProjectSchema = Yup.object().shape({
  projectName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

export default ProjectSchema
