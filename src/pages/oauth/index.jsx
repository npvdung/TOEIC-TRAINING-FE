import React, { useState } from 'react'
import ForgotPass from './common/ForgotPass'
import Login from './common/Login'
import Register from './common/Register'
import './style.scss'
import { Spin } from 'antd'
import Logo from '../../assets/logo/logo.png'

const Oauth = () => {
  const [menuSelected, setMenuSelected] = useState('login')
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div className="hvx-loginPage">
        <div className="container center">
          <div className="hvx-formLogin">
            <Spin spinning={loading}>
              <div className="logo">
                <img className="logo-img" src={Logo} alt="Logo" />
                <div className="text-logo">
                  <h3>High School English</h3>
                </div>
              </div>
              <div className="hvx-menuSelect">
                <div
                  className={`item ${menuSelected === 'login' ? 'active' : ''}`}
                  onClick={() => setMenuSelected('login')}
                >
                  Login
                </div>
                <div className="breackCol"></div>
                {/* <div
                  className={`item ${
                    menuSelected === "forgot" ? "active" : ""
                  }`}
                  onClick={() => setMenuSelected("forgot")}
                >
                  Forgot password
                </div> */}
                <div className="breackCol"></div>
                <div
                  className={`item ${
                    menuSelected === 'register' ? 'active' : ''
                  }`}
                  onClick={() => setMenuSelected('register')}
                >
                  Register
                </div>
              </div>
              <div className="center">
                {menuSelected === 'login' ? (
                  <Login setLoading={setLoading} />
                ) : menuSelected === 'forgot' ? (
                  <ForgotPass />
                ) : (
                  <Register
                    setMenuSelected={setMenuSelected}
                    setLoading={setLoading}
                  />
                )}
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Oauth
