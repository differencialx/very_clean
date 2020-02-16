import React, { Component } from 'react';
import {connect} from 'react-redux';
import HeaderComponent from '../components/Header'
import * as actions from '../actions/actions'

class Header extends Component {
  signOutClick = () => {
    this.props.signOutUser()
  }

  render() {
    const { signOutClick, props: { session, history } } = this
    return (
      <HeaderComponent
        session={session}
        history={history}
        signOutOnClick={signOutClick}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    session: state.session
  }
}

const mapDispatchToProps = {
  signOutUser: actions.signOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
