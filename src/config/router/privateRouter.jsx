import React from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { isLogin } from '../../utils/CheckData'
import { ROUTER_CONST } from '../paramsConst/RouterConst'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
  const history = useHistory()

  localStorage.setItem(
    'urlBeforeLogin',
    `${location.pathname}${location.search}`
  )

  return (
    <Route
      {...rest}
      render={({ props }) =>
        isLogin() ? <Component {...props} /> : history.push(ROUTER_CONST.login)
      }
    />
  )
}

export default PrivateRoute
