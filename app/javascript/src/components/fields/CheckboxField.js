import React from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

const CheckboxField = ({ className, title, extraInfo, onClickHandler, value, titleClass }) => (
  <FormGroup className={className}>
    <Checkbox onClick={onClickHandler} inline defaultChecked={value}>
      <span className={titleClass} >{ title }</span>
      <div className="in-green-500 font-10">{ extraInfo && moment(extraInfo).format('DD/MM/YYYY, h:mm a') }</div>
    </Checkbox>
  </FormGroup>
)

CheckboxField.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  extraInfo: PropTypes.string,
  onClickHandler: PropTypes.func,
  value: PropTypes.bool,
  titleClass: PropTypes.string
}

export default CheckboxField
