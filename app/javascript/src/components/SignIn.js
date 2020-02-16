import React from 'react'
import { Alert, Col, Button } from 'react-bootstrap'
import FormikField from './fields/FormikField'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import SignInSchema from '../formValidations/signIn'
import PropTypes from 'prop-types'

const SignIn = ( { history, onLogin, hideErrors, errorMessage, onSignUpClick } ) => (
  <div className="row">
    <Col sm={8} smOffset={2} md={6} mdOffset={3}>
      <h2>Sign In</h2>
      { hideErrors ||
        <Alert bsStyle="danger">
          <p className="mb-5">{ errorMessage }</p>
        </Alert> }
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          onLogin(values, history)
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
              name="password"
              type='password'
              errors={errors.password}
              touched={touched.password}
              placeholder='Password' />
            <Button type="submit" bsStyle="primary" className="mb-15 mr-15">
              Sign In
            </Button>
            <p>Do not have an account? <Link to="/sign_up" onClick={ onSignUpClick }>Sign Up</Link></p>
          </div>
        </Form>
      )}
      </Formik>
    </Col>
  </div>
)

SignIn.propTypes = {
  history: PropTypes.object,
  hideErrors: PropTypes.bool,
  onLogin: PropTypes.func,
  onSignUpClick: PropTypes.func,
  errorMessage: PropTypes.string
}

export default SignIn
