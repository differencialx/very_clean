import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, session, ...rest }) => (
  <Route 
    {...rest}
    render = { props =>
      session ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={ { pathname: "/sign_in", state: { from: props.location } } }
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  session: PropTypes.bool
}

export default PrivateRoute
