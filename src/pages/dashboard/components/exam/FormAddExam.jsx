import React, { useEffect, useState } from 'react'
import { Button, Input, Form, Spin, Select } from 'antd'
import { getUserInfo } from '../../../../utils/storage'
import { fetchCategories } from '../../../../services/categoriesService'

import FormChooseQuestion from './FormChooseQuestion'
import { ClockCircleOutlined } from '@ant-design/icons'
import QuestionItem from './QuestionItem'
import { createExam } from '../../../../services/examService'
import {
  notificationSuccess,
  notificationWarning,
} from '../../../../utils/Notification'

const { Option } = Select

const FormAddExam = ({ setModeExam, refetch }) => {
  const userInfo = getUserInfo()
  const [loading, setLoading] = useState(false)
  const [selectedQuestionList, setSelectedQuestionList] = useState([])
  const [totalPoint, setTotalPoint] = useState(0)

  const [questionCategorySelected, setQuestionCategorySelected] = useState(null)

  const [categoriesList, setCategoriesList] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchCategories((res) => {
      setCategoriesList(res.data.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (selectedQuestionList?.length) {
      let tPoint = 0
      selectedQuestionList.forEach((item) => (tPoint += item.questionPoint))
      setTotalPoint(tPoint)
    }
    // eslint-disable-next-line
  }, [selectedQuestionList])

  const handleRemoveQuestionSelected = (questId) => {
    if (questId) {
      const newSelectedQuestionList = selectedQuestionList.filter(
        (question) => question.id !== questId
      )
      setSelectedQuestionList(newSelectedQuestionList)
    }
  }

  const handleAddExam = (value) => {
    if (value) {
      const newExamValue = {
        examName: value.examName,
        totalPoint: totalPoint,
        userId: userInfo?.id,
        totalTime: value.totalTime,
        categoryId: questionCategorySelected,
        listQuestion: JSON.stringify(
          selectedQuestionList?.map((question) => question.id)
        ),
      }
      setLoading(true)
      createExam(
        newExamValue,
        () => {
          notificationSuccess('create new exam success!')
          setModeExam('view')
          refetch(Date.now())
          setLoading(false)
        },
        (err) => {
          console.log(err.response)
          setLoading(false)
          notificationWarning('Oop!!, Some thing went wrong!')
        }
      )
    }
  }

  return (
    <>
      <Spin spinning={loading}>
        <Form onFinish={handleAddExam}>
          <div>
            <div className="col-md-12">
              <h3 className="exam-title">Create new exam</h3>
              <div className="row">
                {/* name */}
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Name
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="examName"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your question name!',
                      },
                      {
                        max: 50,
                        message: 'Question name too long!',
                      },
                    ]}
                  >
                    <Input placeholder="Enter exam name" />
                  </Form.Item>
                </div>
                {/* category */}
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionCategory">
                    <span className="required mt-2 mr-1">*</span> Category
                  </label>

                  <Form.Item
                    style={{ width: '100%' }}
                    name="examCategory"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose category!',
                      },
                    ]}
                    initialValue={questionCategorySelected}
                  >
                    <Select
                      style={{ width: '100%' }}
                      onChange={(value) => setQuestionCategorySelected(value)}
                    >
                      <Option value={null}>Choose category</Option>
                      {categoriesList?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}{' '}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span>{' '}
                    <ClockCircleOutlined className="mr-2" /> Time (minutes)
                  </label>
                  <Form.Item
                    style={{ width: '150px' }}
                    name="totalTime"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter time!',
                      },
                    ]}
                  >
                    <Input placeholder="0" />
                  </Form.Item>
                </div>
                <div className="col-md-2">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Point
                  </label>
                  <span className="ml-2">
                    <b>{totalPoint}</b>
                  </span>
                </div>
                <div className="col-md-4 mt-4">
                  <div className="row pl-2 mt-1">
                    <Form.Item>
                      <Button htmlType="submit" className="btn-dashboard ml-2">
                        Create
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        onClick={() => setModeExam('view')}
                        className="btn-dashboard-outline ml-3"
                      >
                        Close
                      </Button>
                    </Form.Item>
                  </div>
                </div>
                <div className="col-md-12">
                  <FormChooseQuestion
                    FormChooseQuestion={selectedQuestionList}
                    setSelectedQuestionList={setSelectedQuestionList}
                    categoriesList={categoriesList}
                    questionCategorySelected={questionCategorySelected}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  Selected Questions : <b>{selectedQuestionList?.length}</b>
                </div>

                <QuestionItem
                  data={selectedQuestionList}
                  handleRemoveQuestionSelected={handleRemoveQuestionSelected}
                />
              </div>
            </div>
          </div>
        </Form>
      </Spin>
    </>
  )
}

export default FormAddExam
