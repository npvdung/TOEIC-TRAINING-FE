import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Select, Spin, Input, Checkbox } from 'antd'
import { roleUser } from '../../../../constants/dashboardConstants'
import {
  notificationErr,
  notificationSuccess,
} from '../../../../utils/Notification'
import { PencilSquare } from 'react-bootstrap-icons'
import './style.scss'
import { updateRoleActivated } from '../../../../services/userService'

const { Option } = Select

const EditUser = ({ user, setRefetch }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    if (user) {
      setIsActivated(user.isActivated)
    }
  }, [user])

  const changeIsActivated = (e) => {
    setIsActivated(e.target.checked)
  }

  const handleEditUser = (value) => {
    const updateData = {
      id: user?.id,
      role: value?.role,
      isActivated: isActivated,
    }
    setLoading(true)
    updateRoleActivated(updateData)
      .then((res) => {
        notificationSuccess('Edit user successfully')
        setRefetch(Date.now())
        setVisible(false)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        notificationErr('Update user failed')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        className="mr-1"
        onClick={() => setVisible(true)}
        title="Edit User"
      >
        <PencilSquare />
      </Button>
      <Modal
        title="Edit User"
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Spin spinning={loading}>
          <Form
            onFinish={handleEditUser}
            initialValues={{
              id: user?.id,
              username: user?.username,
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: user?.email,
              role: user?.role,
              isActivated: user?.isActivated,
            }}
          >
            <div className="form-edit-user">
              <div className="col-md-12">
                <div className="row">
                  {/* id */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="id">
                      <span className="mt-2 mr-1">ID</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="id"
                      className=" form-add-item"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </div>

                  {/* username */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="username">
                      <span className="mt-2 mr-1">Username</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="username"
                      className=" form-add-item"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </div>

                  {/* firstName */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="firstName">
                      <span className="mt-2 mr-1">First Name</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="firstName"
                      className=" form-add-item"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </div>

                  {/* lastName */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="firstName">
                      <span className="mt-2 mr-1">Last Name</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="lastName"
                      className=" form-add-item"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </div>

                  {/* email */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="email">
                      <span className="mt-2 mr-1">Email</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="email"
                      className=" form-add-item"
                    >
                      <Input readOnly disabled />
                    </Form.Item>
                  </div>

                  {/* Role */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="role">
                      <span className="mt-2 mr-1">Role</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="role"
                      className="form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose role!',
                        },
                      ]}
                    >
                      <Select>
                        {roleUser?.map((role) => (
                          <Option key={role.id} value={role.id}>
                            {role.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* Activated */}
                  <div className="col-md-6">
                    <Form.Item
                      style={{ width: '100%' }}
                      name="isActivated"
                      className="form-add-item"
                    >
                      <Checkbox
                        checked={isActivated}
                        onChange={changeIsActivated}
                      >
                        Activated
                      </Checkbox>
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="row pl-2">
                  <Form.Item>
                    <Button htmlType="submit" className="btn-dashboard ml-2">
                      Update
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default EditUser
