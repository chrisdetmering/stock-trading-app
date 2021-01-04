import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuth, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          <Component />
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }
      }
      } />
  )
}

export default ProtectedRoute