import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Select, Spin } from 'antd'
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
} from '../../../../constants/dashboardConstants'
import { getContentABCD } from '../../../../utils/questionTools'
import { getUserInfo } from '../../../../utils/storage'
import moment from 'moment'
import {
  notificationErr,
  notificationSuccess,
} from '../../../../utils/Notification'
import { editQuestion } from '../../../../services/questionService'
import './style.scss'
import { PencilSquare } from 'react-bootstrap-icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = Select

const FormEditQuestion = ({
  question,
  categoriesList,
  setRefetch,
  editQuestionToReading,
  questionList,
  setQuestionList,
}) => {
  const [visible, setVisible] = useState(false)
  const [optionAnswer, setOptionAnswer] = useState({
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  })
  const userInfo = getUserInfo()
  const [loading, setLoading] = useState(false)
  const [questionEdit, setQuestionEdit] = useState(question)

  useEffect(() => {
    if (question && question.questionType === QUESTION_CHOOSE_ABCD) {
      const arrOption = question.questionContent?.split('|')
      if (arrOption) {
        setOptionAnswer({
          optionA: arrOption[0],
          optionB: arrOption[1],
          optionC: arrOption[2],
          optionD: arrOption[3],
        })
      }
    }
  }, [question])

  const handleEditQuestion = (value) => {
    if (value) {
      const {
        questionType,
        questionTitle,
        questionDescription,
        questionLevel,
        questionCategory,
        questionAnswer,
        questionPoint,
        explanation,
        optionA,
        optionB,
        optionC,
        optionD,
      } = value
      const newQuestion = {
        id: question?.id,
        questionType,
        questionTitle: questionTitle ? questionTitle : null,
        questionDescription,
        questionLevel,
        questionCategory,
        questionAnswer,
        questionPoint,
        questionExam: 0,
        explanation: explanation ? explanation : null,
        questionContent: getContentABCD({ optionA, optionB, optionC, optionD }),
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format('YYYY/MM/DD'),
      }
      if (editQuestionToReading) {
        const temp = [...questionList]
        const objIndex = temp.findIndex((obj) => obj.id === question.id)
        temp[objIndex] = {
          ...newQuestion,
          readingId: question?.readingId,
        }
        setQuestionList(temp)
        setVisible(false)
      } else {
        setLoading(true)
        editQuestion(
          newQuestion,
          () => {
            setRefetch(Date.now())
            setLoading(false)
            notificationSuccess('Update successfully')
            setVisible(false)
          },
          (err) => {
            setLoading(false)
            notificationErr(err?.response?.message || 'Something went wrong')
          }
        )
      }
    }
  }

  const renderFormAnswer = (questType) => {
    if (questType) {
      if (questType === QUESTION_CHOOSE_ABCD) {
        return (
          <div className="col-md-12">
            <label className="quest-label" htmlFor="Content">
              <span className="required mt-2 mr-1">*</span> Content
            </label>
            <div className="row pl-2 pr-2">
              {' '}
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionA"
                  className="form-add-item"
                  label="A"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option A!',
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    name="optionA"
                    value={questionEdit.optionA}
                    onChange={(value) =>
                      setQuestionEdit({ ...questionEdit, optionA: value })
                    }
                    placeholder="Enter option A"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionB"
                  className="form-add-item"
                  label="B"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option B!',
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    name="optionB"
                    value={questionEdit.optionB}
                    onChange={(value) =>
                      setQuestionEdit({ ...questionEdit, optionB: value })
                    }
                    placeholder="Enter option B"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionC"
                  className="form-add-item"
                  label="C"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option C!',
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    name="optionC"
                    value={questionEdit.optionC}
                    onChange={(value) =>
                      setQuestionEdit({ ...questionEdit, optionC: value })
                    }
                    placeholder="Enter option C"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionD"
                  className="form-add-item"
                  label="D"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option D!',
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    name="optionD"
                    value={questionEdit.optionD}
                    onChange={(value) =>
                      setQuestionEdit({ ...questionEdit, optionD: value })
                    }
                    placeholder="Enter option D"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return null
    }
  }

  return (
    <>
      <Button
        className="mr-1"
        onClick={() => setVisible(true)}
        title="Edit Question"
      >
        <PencilSquare />
      </Button>
      <Modal
        title="Edit question"
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Spin spinning={loading}>
          <Form
            onFinish={handleEditQuestion}
            initialValues={{
              questionType: question?.questionType,
              questionTitle: question?.questionTitle,
              questionDescription: question?.questionDescription,
              questionLevel: question?.questionLevel,
              questionCategory: question?.questionCategory,
              questionAnswer: question?.questionAnswer,
              questionPoint: question?.questionPoint,
              explanation: question?.explanation,
              optionA: optionAnswer?.optionA,
              optionB: optionAnswer?.optionB,
              optionC: optionAnswer?.optionC,
              optionD: optionAnswer?.optionD,
            }}
          >
            <div className="form-edit-question">
              <div className="col-md-12">
                <div className="row">
                  {/* type */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionType">
                      <span className="required mt-2 mr-1">*</span> Type
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionType"
                      className=" form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose type!',
                        },
                      ]}
                    >
                      <Select>
                        <Option value="">Choose type</Option>
                        {questionType.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}{' '}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* level */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionType">
                      <span className="required mt-2 mr-1">*</span> Level
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionLevel"
                      className=" form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose level!',
                        },
                      ]}
                    >
                      <Select>
                        <Option value="">Choose level</Option>
                        {questionLevel.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}{' '}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* category */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionCategory">
                      <span className="required mt-2 mr-1">*</span> Category
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionCategory"
                      className="form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose category!',
                        },
                      ]}
                    >
                      <Select>
                        <Option value={0}>Choose category</Option>
                        {categoriesList?.map((category) => (
                          <Option key={category.id} value={category.id}>
                            {category.categoryName}{' '}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* Point */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionPoint">
                      <span className="required mt-2 mr-1">*</span> Point
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionPoint"
                      className="form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please choose Point!',
                        },
                      ]}
                    >
                      <Select>
                        <Option value={0}>Choose Point</Option>
                        {questionPoint?.map((point) => (
                          <Option key={point.id} value={point.value}>
                            {point.value}{' '}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  {/* title */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionType">
                      <span className="mt-2 mr-1">Title</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionTitle"
                      className="form-add-item"
                    >
                      <ReactQuill
                        theme="snow"
                        name="questionTitle"
                        value={questionEdit.questionTitle}
                        onChange={(value) =>
                          setQuestionEdit({ ...question, questionTitle: value })
                        }
                        placeholder="Enter question title"
                      />
                    </Form.Item>
                  </div>

                  {/* Description */}
                  <div className="col-md-6">
                    <label
                      className="quest-label"
                      htmlFor="questionDescription"
                    >
                      <span className="mt-2 mr-1">Description</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionDescription"
                      className="form-add-item"
                      rules={[
                        {
                          max: 500,
                          message: 'Description too long!',
                        },
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        name="questionDescription"
                        value={questionEdit.questionDescription}
                        onChange={(value) =>
                          setQuestionEdit({
                            ...question,
                            questionDescription: value,
                          })
                        }
                        placeholder="Enter description"
                      />
                    </Form.Item>
                  </div>

                  {/* Content */}
                  {renderFormAnswer(question?.questionType)}

                  {/* Answer */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="questionAnswer">
                      <span className="required mt-2 mr-1">*</span> Answer
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="questionAnswer"
                      className="form-add-item"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your question answer!',
                        },
                        {
                          max: 200,
                          message: 'Answer name too long!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              getFieldValue('questionType') !==
                                QUESTION_CHOOSE_ABCD ||
                              getFieldValue('optionA') === value ||
                              getFieldValue('optionB') === value ||
                              getFieldValue('optionC') === value ||
                              getFieldValue('optionD') === value
                            ) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              new Error(
                                'The answer does not match one of the options!'
                              )
                            )
                          },
                        }),
                      ]}
                    >
                      <ReactQuill
                        theme="snow"
                        name="questionAnswer"
                        value={questionEdit.questionAnswer}
                        onChange={(value) =>
                          setQuestionEdit({
                            ...question,
                            questionAnswer: value,
                          })
                        }
                        placeholder="Enter question answer"
                      />
                    </Form.Item>
                  </div>

                  {/* Explanation */}
                  <div className="col-md-6">
                    <label className="quest-label" htmlFor="explanation">
                      <span className="mt-2 mr-1">Explanation</span>
                    </label>
                    <Form.Item
                      style={{ width: '100%' }}
                      name="explanation"
                      className="form-add-item"
                    >
                      <ReactQuill
                        theme="snow"
                        name="explanation"
                        value={questionEdit.explanation}
                        onChange={(value) =>
                          setQuestionEdit({
                            ...question,
                            explanation: value,
                          })
                        }
                        placeholder="Enter explanation"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-4">
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

export default FormEditQuestion
