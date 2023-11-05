import { RetweetOutlined } from '@ant-design/icons'
import { Input, Spin, Table } from 'antd'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../../services/userService'
import { flatDataTable } from '../../../../utils/questionTools'
import {
  renderRole,
  renderUserActivate,
} from '../../../../constants/dashboardConstants'
import EditUser from './EditUser'
import './style.scss'
const { Search } = Input

const UserDashboard = () => {
  const [usersList, setUsersList] = useState([])
  const [usersListClone, setUsersListClone] = useState([])

  const [loadingDataTable, setLoadingDataTable] = useState(false)
  const [refetch, setRefetch] = useState(true)
  const [userSearchName, setUserSearchName] = useState('')
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoadingDataTable(true)
    getAllUsers((res) => {
      flatDataTable(res.data.data, (data) => {
        setUsersList(data)
        setUsersListClone(data)
      })
      setLoadingDataTable(false)
    })
  }, [refetch])

  const handleResetUsers = () => {
    setRefetch(Date.now())
  }

  const handleSearchUserNames = () => {
    let usersListCloneSearch = JSON.parse(JSON.stringify(usersListClone))
    usersListCloneSearch = usersListCloneSearch.filter((user) => {
      return user.username.toLowerCase().match(userSearchName?.toLowerCase())
    })
    setUsersList(usersListCloneSearch)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
      key: 'ID',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: '15%',
      key: 'username',
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      width: '15%',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      width: '15%',
      key: 'lastName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '15%',
      key: 'role',
      render: (role) => renderRole(role),
    },
    {
      title: 'Activated',
      dataIndex: 'isActivated',
      width: '10%',
      key: 'isActivated',
      render: (isActivated) => (
        <div className={isActivated === true ? 'is-activated' : 'de-activated'}>
          {renderUserActivate(isActivated)}
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (row) => {
        return (
          <div className="center flex-row">
            <EditUser user={row} setRefetch={setRefetch} />
          </div>
        )
      },
      width: '5%',
    },
  ]
  return (
    <div className="content-wrapper">
      <Spin spinning={false}>
        <div className="content-top">
          <div className="col-md-6">
            <div className="align-item-center">
              <Search
                value={userSearchName}
                onChange={(e) => setUserSearchName(e.target.value)}
                placeholder="Search username"
                onSearch={handleSearchUserNames}
              />
            </div>
          </div>

          <div className="btn-dashboard" onClick={handleResetUsers}>
            <RetweetOutlined className="reset-icon icon" />
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <h5>Users</h5>
        </div>
        <div className="table-field">
          <Table
            loading={loadingDataTable}
            columns={columns}
            dataSource={usersList}
            style={{ width: '100%' }}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Spin>
    </div>
  )
}

export default UserDashboard
