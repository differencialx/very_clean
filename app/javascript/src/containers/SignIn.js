import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignInComponent from '../components/SignIn'
import * as authenticationActions from '../actions/actions'

class SignIn extends Component {
  state = {
    credentials: {
      login: '',
      password: ''
    }
  }

  credentialsOnChange = (event) => {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onLogin = (values, history) => {
    this.props.signInUserRequest(values, history)
  }

  onSignUpClick = () => {
    this.props.clearAuthForm()
  }

  render() {
    const {
      props: {
        hideErrors,
        errorMessage,
        history
      },
      onSignUpClick,
      onLogin
    } = this
    return (
      <SignInComponent
        hideErrors={hideErrors}
        errorMessage={errorMessage}
        onSignUpClick={onSignUpClick}
        history={history}
        onLogin={onLogin}/>
        
    )
  }
}

function mapStateToProps(state) {
  return {
    hideErrors: state.authForm.hideErrors,
    errorMessage: state.authForm.message,
  }
}

const mapDispatchToProps = {
  signInUserRequest: authenticationActions.signInUserRequest,
  clearAuthForm: authenticationActions.clearAuthForm
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

