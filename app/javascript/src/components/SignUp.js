import React from 'react'
import { Alert, Col, Button} from 'react-bootstrap'
import FormikField from './fields/FormikField'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import SignUpSchema from '../formValidations/signUp'
import PropTypes from 'prop-types'

const SignUp = ({ history, hideErrors, onSignUp, onSignInClick, errorMessage }) => (
  <div className="row">
    <Col sm={8} smOffset={2} md={6} mdOffset={3}>
      <h2>Sign Up</h2>
      { hideErrors ||
        <Alert bsStyle="danger">
          <p className="mb-5">{errorMessage}</p>
        </Alert>
      }
      <Formik
        initialValues={{ login: '', password: '', passwordConfirmation: '' }}
        validationSchema={SignUpSchema}
        onSubmit={values => {
          onSignUp(values, history)
        }}
      >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-20">
            <FormikField
              name="login"
              errors={errors.login}
              touched={touched.login}
              placeholder='Login' />
            <FormikField
              name='password'
              type='password'
              errors={errors.password}
              touched={touched.password}
              placeholder='Password' />
            <FormikField
              name='passwordConfirmation'
              type='password'
              errors={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              placeholder='Confir password' />
            <Button type="submit" bsStyle="primary" className="mb-15 mr-15">
              Sign Up
            </Button>
            <p>Already a member? <Link to="/sign_in" onClick={onSignInClick}>Sign In</Link></p>
          </div>
        </Form>
      )}
      </Formik>
    </Col>
  </div>
)

SignUp.propTypes = {
  history: PropTypes.object,
  hideErrors: PropTypes.bool,
  onSignUp: PropTypes.func,
  onSignInClick: PropTypes.func,
  errorMessage: PropTypes.string
}

export default SignUp
