import React from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import PropTypes from 'prop-types'

const TextareaField = ({ label, placeholder, onChangeHandler, value }) => (
  <FormGroup>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl componentClass="textarea" placeholder={placeholder} onChange={onChangeHandler} value={value} />
  </FormGroup>
)

TextareaField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeHandler: PropTypes.func,
  value: PropTypes.string
}

export default TextareaField
