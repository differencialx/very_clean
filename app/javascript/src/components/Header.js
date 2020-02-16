import React from 'react'
import logo from '../../../../public/logo.svg'
import { Glyphicon } from 'react-bootstrap'

const Header = (props) => (
  <header className="main-header">
    <div className="container pt-10 pb-5">
      <div className="row d-flex align-center">
        <div className="col-xs-3">
          <a className="mb-5" href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="col-xs-6 text-center">
          <h1 className="mt-0 mb-5">Simple ToDo List</h1>
        </div>
        { !props.session ||
          <div className="col-xs-3 text-right">
            <span onClick={props.signOutOnClick} ><Glyphicon glyph="log-out" /></span>
          </div>
        }

      </div>
    </div>
  </header>
)

export default Header
