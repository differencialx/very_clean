import React from 'react'
import {
  FormGroup,
  ControlLabel,
} from 'react-bootstrap'
import { Field } from 'formik'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FormikField = ({ label,
                       placeholder,
                       className,
                       name,
                       component,
                       errors,
                       touched,
                       onClickHandler,
                       type = 'text' }) => (
  <FormGroup className={className}>
    { label && <ControlLabel>{label}</ControlLabel> }
    <Field
      className={classNames('form-control')}
      component={component}
      type={type}
      placeholder={placeholder}
      name={name}
      onClick={onClickHandler}
    />
    {errors && touched ? (
      <div className='alert alert-danger'>{errors}</div>
    ) : null}
  </FormGroup>
)

FormikField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  component: PropTypes.string,
  errors: PropTypes.string,
  touched: PropTypes.bool,
  onClickHandler: PropTypes.func,
  type: PropTypes.string
}

export default FormikField
