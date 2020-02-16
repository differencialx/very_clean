import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

const TextField = ({ label, placeholder, className, onClickHandler, onChangeHandler, value, name, type = 'text' }) => (

  <FormGroup className={className}>
    { label && <ControlLabel>{label}</ControlLabel> }
    <FormControl
      type={type}
      placeholder={placeholder}
      onClick={onClickHandler}
      value={value}
      onChange={onChangeHandler}
      name={name}
    />
  </FormGroup>
)

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
  onChangeHandler: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
}

export default TextField
