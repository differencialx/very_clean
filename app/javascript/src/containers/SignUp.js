import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpComponent from '../components/SignUp'
import * as authenticationActions from '../actions/actions'

class SignUp extends Component {
  onSignUp = (values, history) => {
    this.props.signUpUserRequest(values, history)
  }

  onSignInClick = () => {
    this.props.clearAuthForm()
  }

  render() {
    const {
      props: {
        hideErrors,
        errorMessage,
        history
      },
      onSignUp,
      onSignInClick
    } = this
    return (
      <SignUpComponent
        hideErrors={hideErrors}
        errorMessage={errorMessage}
        onSignInClick={onSignInClick}
        history={history}
        onSignUp={onSignUp}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    hideErrors: state.authForm.hideErrors,
    errorMessage: state.authForm.message
  }
}

const mapDispatchToProps = {
  signUpUserRequest: authenticationActions.signUpUserRequest,
  clearAuthForm: authenticationActions.clearAuthForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
