import React, { useState } from 'react'
import { Form, Input } from 'antd'
import HvxButton from '../../../components/button/HvxButton'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { registerRequest } from '../../../services/authService'
import {
  notificationErr,
  notificationSuccess,
} from '../../../utils/Notification'

const Register = ({ setMenuSelected, setLoading }) => {
  const [showPass, setShowPass] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    let param = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      username: values.username,
      password: values.password,
    }

    registerRequest(param, getRegisterResponse, getError)
  }

  const getRegisterResponse = () => {
    setLoading(false)
    setMenuSelected('login')
    notificationSuccess('Resgiter success!')
  }

  const getError = (error) => {
    setLoading(false)
    const err = error.response
    notificationErr(err?.data?.message || 'Something went wrong :(')
  }
  return (
    <div className="loginForm">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <label htmlFor="firstname" className="ml-2">
          First Name
        </label>
        <Form.Item
          className="hvx-input"
          name="firstname"
          rules={[
            { required: true, message: 'Please input your first name!' },
            { max: 20, message: 'Max length 20 character' },
          ]}
        >
          <Input className="hvx-input" />
        </Form.Item>

        <label htmlFor="lastname" className="ml-2">
          Last Name
        </label>
        <Form.Item
          className="hvx-input"
          name="lastname"
          rules={[
            { required: true, message: 'Please input your last name!' },
            { max: 20, message: 'Max length 20 character' },
          ]}
        >
          <Input className="hvx-input" />
        </Form.Item>
        <label htmlFor="lastname" className="ml-2">
          Email
        </label>
        <Form.Item
          className="hvx-input"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input className="hvx-input" />
        </Form.Item>

        <label htmlFor="username" className="ml-2">
          Username
        </label>
        <Form.Item
          className="hvx-input"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { max: 20, message: 'Max length 20 character' },
            { min: 5, message: 'Min length 6 character' },
            {
              validator: (_, value) =>
                // eslint-disable-next-line
                /[^a-zA-Z0-9\-\/]/.test(value)
                  ? Promise.reject(
                      new Error('Username cannot contain special characters')
                    )
                  : Promise.resolve(),
            },
          ]}
        >
          <Input className="hvx-input" />
        </Form.Item>

        <label htmlFor="password" className="ml-2">
          Password
        </label>
        <div className="posPass">
          <Form.Item
            name="password"
            className="password-input"
            rules={[
              { required: true, message: 'Please input your password!' },
              { max: 20, message: 'Max length 20 character' },
            ]}
          >
            <Input
              type={showPass ? 'text' : 'password'}
              className="hvx-input"
            />
          </Form.Item>

          <div className="eye" onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeOutlined className="eye-icon" />
            ) : (
              <EyeInvisibleOutlined className="eye-icon" />
            )}
          </div>
        </div>

        <Form.Item>
          <HvxButton
            type="primary"
            htmlType="submit"
            text="Register"
            className="hvx-btn-login"
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
