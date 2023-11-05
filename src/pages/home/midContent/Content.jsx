import React, { useEffect, useState } from 'react'
import { Input, Spin } from 'antd'
import Lesson from './Lesson'
import { getExamListByCategory } from '../../../services/examService'
import './style.scss'

const { Search } = Input

const Content = ({ currentMenu }) => {
  const [examList, setExamList] = useState()
  const [examListClone, setExamListClone] = useState()
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    setLoadingData(true)
    getExamListByCategory(
      currentMenu,
      (res) => {
        setExamList(res.data.data)
        setExamListClone(res.data.data)
        setLoadingData(false)
      },
      getError
    )
    // eslint-disable-next-line
  }, [currentMenu])

  const handleSearchExams = (value) => {
    if (!value.trim() || !value?.length) {
      setExamList(examListClone)
    } else {
      const newExams = examListClone.filter((exam) =>
        exam?.examName.toLowerCase().match(value.trim().toLowerCase())
      )
      setExamList(newExams)
    }
  }

  const getError = (err) => {
    console.log(err)
    setLoadingData(false)
  }

  return (
    <div className="col-md-6 midContent">
      <Spin spinning={loadingData}>
        <div className="content-header">
          <div className="row">
            {/* <div className="col-md-6">
              <Select
                defaultValue="all"
                style={{ width: '100%' }}
                className="rate-selected"
              >
                <Option value="all">All</Option>
                <Option value="used">Used to do</Option>
                <Option value="not">Not done yet</Option>
              </Select>
            </div> */}
            <div className="col-md-6">
              <Search
                placeholder="Search..."
                allowClear
                onSearch={handleSearchExams}
                style={{ width: '100%' }}
                className="search-input"
              />
            </div>
          </div>
        </div>
        <div className="list-box">
          <div className="row">
            {examList?.length > 0 ? (
              examList?.map((exam) => {
                return (
                  <Lesson
                    key={exam.id}
                    id={exam.id}
                    title={exam.examName}
                    totalPoint={exam.totalPoint}
                    totalTime={exam.totalTime}
                  />
                )
              })
            ) : (
              <div className="center" style={{ width: '100%' }}>
                No data
              </div>
            )}
          </div>
        </div>
        {/* <div className="center">
          <Pagination defaultCurrent={1} total={50} />
        </div> */}
      </Spin>
    </div>
  )
}

export default Content
