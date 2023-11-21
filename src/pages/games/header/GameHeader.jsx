import React from 'react'
import './style.scss'
import logo from '../../../assets/logo/logo.png'
import { LoginOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import { ROUTER_CONST } from '../../../config/paramsConst/RouterConst'
import { getUserInfo } from '../../../utils/storage'

const GameHeader = () => {
  const history = useHistory()
  const user = getUserInfo()

  const onBack = () => {
    Swal.fire({
      title: 'Are you sure you want to exit?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(ROUTER_CONST.home)
      }
    })
  }
  return (
    <div className="hvx-gameHeader">
      <div className="container">
        <div className="row justifySpaceBetween">
          <div className="hvx-headerContent-left">
            <img className="hvx-logo" src={logo} alt="logoHVX" />
            <div className="text-logo">
              <h1>TOEIC TRAINING</h1>
            </div>
          </div>
          <div className="hvx-headerContent-right center">
            <span>
              {user?.firstName}&nbsp;{user?.lastName}
            </span>
            <div className="hvx-btnBack ml-5" onClick={onBack}>
              <span>
                Back
                <LoginOutlined className="ml-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameHeader
