import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import Logo from '../../../../assets/logo/logo.png'
import { getUserInfo } from '../../../../utils/storage'
import { useHistory } from 'react-router-dom'
import { ROUTER_CONST } from '../../../../config/paramsConst/RouterConst'

const HeaderDashboard = () => {
  const userInfo = getUserInfo()
  const history = useHistory()

  return (
    <div className="header-dashboard">
      <div className="container-fluid">
        <div className="header-content pl-2 pr-5">
          <div
            className="header-left"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <img
              className="header-logo-img"
              style={{ width: '60px' }}
              src={Logo}
              alt="Logo"
            />
            <div className="text-logo">
              <h1>TOEIC TRAINING</h1>
            </div>
          </div>

          <div className="header-row">
            <span className="username">
              Hello:{' '}
              <b className="name">
                {userInfo?.firstName} {userInfo?.lastName}
              </b>
            </span>
            <div
              className="logout"
              onClick={() => history.push(ROUTER_CONST.home)}
            >
              <LogoutOutlined className="logout-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderDashboard
