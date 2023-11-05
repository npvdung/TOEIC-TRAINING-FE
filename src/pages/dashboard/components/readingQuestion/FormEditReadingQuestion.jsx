import React, { useEffect, useState } from 'react'
import { Button, Input, Form, Select, Modal, Table } from 'antd'
import {
  questionLevel,
  questionType,
  QUESTION_READING,
  renderHTMLtoWord,
} from '../../../../constants/dashboardConstants'
import moment from 'moment'
import { notificationSuccess } from '../../../../utils/Notification'
import { getUserInfo } from '../../../../utils/storage'
import FormAddQuestion from '../question/FormAddQuestion'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.scss'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import FormEditQuestion from '../question/FormEditQuestion'
import { updateReadingQuestion } from '../../../../services/readingQuestionService'
import { removeQuestion } from '../../../../services/questionService'
import Swal from 'sweetalert2'

const { Option } = Select

const FormEditReadingQuestion = ({
  question,
  categoriesList,
  setLoading,
  setRefetch,
}) => {
  const [visible, setVisible] = useState(false)
  const [questionList, setQuestionList] = useState([])
  const [openAddQuestion, setOpenAddQuestion] = useState(false)
  const [readingQuestion, setReadingQuestion] = useState(question)
  const userInfo = getUserInfo()
  const [form] = Form.useForm()

  useEffect(() => {
    setReadingQuestion(question)
    setQuestionList(question?.questionList)
  }, [question])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'questionTitle',
      width: '60%',
      key: 'questionTitle',
      render: (questionTitle) => (
        <div className="quest-content-html">
          {renderHTMLtoWord(questionTitle)}
        </div>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'questionContent',
      width: '40%',
      key: 'questionContent',
      render: (questionContent) => (
        <div className="quest-content-html">
          {renderHTMLtoWord(questionContent)}
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (row) => {
        return (
          <div className="center flex-row">
            <FormEditQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
              editQuestionToReading={true}
              questionList={questionList}
              setQuestionList={setQuestionList}
            />
            <Button
              onClick={() => handleDeleteQuestion(row.id)}
              title="Delete Question"
            >
              <Trash />
            </Button>
          </div>
        )
      },
      width: '10%',
    },
  ]
  const onReset = () => {
    form.resetFields()
  }

  const handleUpdateReadingQuestion = (value) => {
    if (value) {
      const { title, paragraph, translate, level, categoryId } = value
      const newReadingQuestion = {
        id: readingQuestion?.id,
        title: title ? title : null,
        paragraph,
        translate: translate ? translate : null,
        level,
        categoryId,
        questionList: questionList,
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format('YYYY/MM/DD'),
      }

      setLoading(true)
      updateReadingQuestion(
        newReadingQuestion,
        () => {
          setRefetch(Date.now())
          onReset()
          setVisible(false)
          setLoading(false)
          notificationSuccess('Update successfully')
        },
        () => setLoading(false)
      )
    }
  }

  const handleDeleteQuestion = (questionId) => {
    Swal.fire({
      title: 'Are you sure delete this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        removeQuestion(
          questionId,
          () => {
            setLoading(false)
            setRefetch(Date.now())
            notificationSuccess('Delete successfully')
          },
          (error) => console.log(error)
        )
      }
    })
  }

  return (
    <>
      <FormAddQuestion
        setOpenAddForm={setOpenAddQuestion}
        openAddForm={openAddQuestion}
        addQuestionToReading={true}
        questionList={questionList}
        setQuestionList={setQuestionList}
      />
      <Button
        className="mr-1"
        onClick={() => setVisible(true)}
        title="Edit Reading Question"
      >
        <PencilSquare />
      </Button>
      <Modal
        title="Edit reading question"
        centered
        open={visible}
        onCancel={() => {
          setVisible(false)
          onReset()
        }}
        width={1000}
      >
        <Form
          form={form}
          onFinish={handleUpdateReadingQuestion}
          initialValues={{
            questionType: QUESTION_READING,
            level: readingQuestion?.level,
            categoryId: readingQuestion?.categoryId,
            title: readingQuestion?.title,
            paragraph: readingQuestion?.paragraph,
            translate: readingQuestion?.translate,
          }}
        >
          <div className="form-add-question">
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
                  >
                    <Select disabled>
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
                  <label className="quest-label" htmlFor="level">
                    <span className="required mt-2 mr-1">*</span> Level
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="level"
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
                  <label className="quest-label" htmlFor="categoryId">
                    <span className="required mt-2 mr-1">*</span> Category
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="categoryId"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please choose category!',
                      },
                    ]}
                  >
                    <Select defaultValue={0}>
                      <Option value={0}>Choose category</Option>
                      {categoriesList?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}{' '}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* title */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="title">
                    <span className="mt-2 mr-1">Title</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="title"
                    className="form-add-item"
                  >
                    <Input placeholder="Enter question title" />
                  </Form.Item>
                </div>

                {/* Paragraph */}
                <div className="col-md-12">
                  <label className="quest-label" htmlFor="paragraph">
                    <span className="required mt-2 mr-1">*</span> Paragraph
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="paragraph"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: 'Please input paragraph!',
                      },
                    ]}
                  >
                    <ReactQuill
                      theme="snow"
                      name="paragraph"
                      value={readingQuestion.paragraph}
                      onChange={(value) =>
                        setReadingQuestion({
                          ...readingQuestion,
                          paragraph: value,
                        })
                      }
                      placeholder="Enter paragraph"
                    />
                  </Form.Item>
                </div>

                <div className="col-md-12">
                  <label className="quest-label" htmlFor="translate">
                    <span className="mt-2 mr-1">Translate</span>
                  </label>
                  <Form.Item
                    style={{ width: '100%' }}
                    name="translate"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="translate"
                      value={readingQuestion.translate}
                      onChange={(value) =>
                        setReadingQuestion({
                          ...readingQuestion,
                          translate: value,
                        })
                      }
                      placeholder="Enter translate"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            {questionList.length > 0 && (
              <div className="col-md-12">
                <label className="quest-label" htmlFor="questionList">
                  <span className="mt-2 mr-1">Question List</span>
                </label>
                <div className="table-field">
                  <Table
                    columns={columns}
                    dataSource={questionList}
                    style={{ width: '100%' }}
                    pagination={false}
                  />
                </div>
              </div>
            )}
            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button
                    className="btn-dashboard ml-2"
                    onClick={() => {
                      setOpenAddQuestion(true)
                    }}
                  >
                    Add question
                  </Button>
                </Form.Item>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button htmlType="submit" className="btn-dashboard ml-2">
                    Update Reading Question
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setVisible(false)
                    }}
                    className="btn-dashboard-outline ml-2"
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

export default FormEditReadingQuestion
