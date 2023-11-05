import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTER_CONST } from '../../../../config/paramsConst/RouterConst'

const HomeDashboard = () => {
  const history = useHistory()
  return (
    <div className="dashboard-home">
      <div className="container-fluid">
        <div className="row">
          {/*  */}
          <div className="col-md-4">
            <div className="rp-item">
              <div className="item-title">Users</div>
              {/* <span className="item-content">Total: 10</span> */}

              <div className="btn-view">
                <Button
                  className="btn btn-dashboard"
                  onClick={() => history.push(ROUTER_CONST.user)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="col-md-4">
            <div className="rp-item">
              <div className="item-title">Categories</div>
              {/* <span className="item-content">Total: 10</span> */}

              <div className="btn-view">
                <Button
                  className="btn btn-dashboard"
                  onClick={() => history.push(ROUTER_CONST.categories)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="col-md-4">
            <div className="rp-item">
              <div className="item-title">Questions</div>
              {/* <span className="item-content">Total: 10</span> */}

              <div className="btn-view">
                <Button
                  className="btn btn-dashboard"
                  onClick={() => history.push(ROUTER_CONST.questions)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="col-md-4">
            <div className="rp-item">
              <div className="item-title">Reading Questions</div>
              {/* <span className="item-content">Total: 10</span> */}

              <div className="btn-view">
                <Button
                  className="btn btn-dashboard"
                  onClick={() => history.push(ROUTER_CONST.readingQuestions)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="rp-item">
              <div className="item-title">Exams</div>
              {/* <span className="item-content">Total: 10</span> */}

              <div className="btn-view">
                <Button
                  className="btn btn-dashboard"
                  onClick={() => history.push(ROUTER_CONST.exams)}
                >
                  View Detail
                </Button>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard
