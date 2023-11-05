import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Select } from 'antd'
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
} from '../../../../constants/dashboardConstants'
import './style.scss'
import { Eye } from 'react-bootstrap-icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = Select

const FormViewQuestion = ({ question, categoriesList }) => {
  const [visible, setVisible] = useState(false)
  const [optionAnswer, setOptionAnswer] = useState({
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
  })

  const modules = {
    toolbar: false,
  }

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

  const renderFormAnswer = (questType) => {
    if (questType) {
      if (questType === QUESTION_CHOOSE_ABCD) {
        return (
          <div className="col-md-12">
            <label className="quest-label" htmlFor="Content">
              <span className="mt-2 mr-1"></span> Content
            </label>
            <div className="row pl-2 pr-2">
              {' '}
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionA"
                  className="form-add-item"
                  label="A"
                >
                  <ReactQuill
                    theme="snow"
                    name="optionA"
                    value={optionAnswer.optionA}
                    modules={modules}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionB"
                  className="form-add-item"
                  label="B"
                >
                  <ReactQuill
                    theme="snow"
                    name="optionB"
                    value={optionAnswer.optionB}
                    modules={modules}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionC"
                  className="form-add-item"
                  label="C"
                >
                  <ReactQuill
                    theme="snow"
                    name="optionC"
                    value={optionAnswer.optionC}
                    modules={modules}
                    readOnly
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: '100%' }}
                  name="optionD"
                  className="form-add-item"
                  label="D"
                >
                  <ReactQuill
                    theme="snow"
                    name="optionC"
                    value={optionAnswer.optionD}
                    modules={modules}
                    readOnly
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
        title="View Question"
      >
        <Eye />
      </Button>
      <Modal
        title={`View question`}
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Form
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
          <div className="form-view-question">
            <div className="col-md-12">
              <div className="row">
                {/* type */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="mr-1">Type</span>
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
                    <Select disabled={true}>
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
                    <span className="mr-1">Level</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionLevel"
                    className=" form-add-item"
                  >
                    <Select disabled={true}>
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
                    <span className="mr-1">Category</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionCategory"
                    className="form-add-item"
                  >
                    <Select disabled={true}>
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
                    <span className="mr-1">Point</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionPoint"
                    className="form-add-item"
                  >
                    <Select disabled={true}>
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
                    <span className="mr-1">Title</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionTitle"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="questionTitle"
                      value={question?.questionTitle}
                      modules={modules}
                      readOnly
                    />
                  </Form.Item>
                </div>

                {/* Description */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionDescription">
                    <span className="mr-1">Description</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionDescription"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="questionDescription"
                      value={question?.questionDescription}
                      modules={modules}
                      readOnly
                    />
                  </Form.Item>
                </div>

                {/* Content */}
                {renderFormAnswer(question?.questionType)}

                {/* Answer */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionAnswer">
                    <span className="mr-1">Answer</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="questionAnswer"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="questionAnswer"
                      value={question?.questionAnswer}
                      modules={modules}
                      readOnly
                    />
                  </Form.Item>
                </div>

                {/* Explanation */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="explanation">
                    <span className="mr-1">Explanation</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="explanation"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="explanation"
                      value={question?.explanation}
                      modules={modules}
                      readOnly
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button
                    onClick={() => setVisible(false)}
                    className="btn-dashboard ml-2"
                  >
                    Close
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default FormViewQuestion
