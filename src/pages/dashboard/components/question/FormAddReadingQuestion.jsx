import React, { useState } from "react";
import { Button, Input, Form, Select, Modal, Table } from "antd";
import {
  questionLevel,
  questionType,
  QUESTION_READING,
} from "../../../../constants/dashboardConstants";
import moment from "moment";
import { notificationSuccess } from "../../../../utils/Notification";
import { getUserInfo } from "../../../../utils/storage";
import { createReadingQuestion } from "../../../../services/questionService";
import FormAddQuestion from "./FormAddQuestion";

const { Option } = Select;
const { TextArea } = Input;

const FormAddReadingQuestion = ({
  setLoading,
  setRefetch,
  openFormReadingQuestion,
  setOpenFormReadingQuestion,
  categoriesList,
}) => {
  const [questionList, setQuestionList] = useState([]);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const userInfo = getUserInfo();
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "questionTitle",
      width: "30%",
      key: "questionTitle",
    },
    {
      title: "Content",
      dataIndex: "questionContent",
      width: "20%",
      key: "questionContent",
      render: (questionContent) => (
        <div className="quest-content">{questionContent}</div>
      ),
    },
  ];
  const onReset = () => {
    form.resetFields();
  };

  const handleAddReadingQuestion = (value) => {
    if (value) {
      const { readingTitle, paragraph, translate } = value;
      const newReadingQuestion = {
        title: readingTitle,
        paragraph,
        translate,
        questionList: questionList,
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format("YYYY/MM/DD"),
      };
      setLoading(true);
      createReadingQuestion(
        newReadingQuestion,
        () => {
          setRefetch(Date.now());
          setLoading(false);
          setOpenFormReadingQuestion(false);
          onReset();
          notificationSuccess("Create successfully");
        },
        () => setLoading(false)
      );
    }
  };

  return (
    <>
      <FormAddQuestion
        setOpenAddForm={setOpenAddQuestion}
        openAddForm={openAddQuestion}
        addQuestionToReading={true}
        questionList={questionList}
        setQuestionList={setQuestionList}
      />
      <Modal
        title="Add reading question"
        centered
        visible={openFormReadingQuestion}
        onCancel={() => {
          setOpenFormReadingQuestion(false);
          onReset();
        }}
        width={1000}
      >
        <Form
          form={form}
          onFinish={handleAddReadingQuestion}
          initialValues={{
            questionType: QUESTION_READING,
            questionLevel: 1,
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
                    style={{ width: "100%" }}
                    name="questionType"
                    className=" form-add-item"
                  >
                    <Select disabled>
                      <Option value="">Choose type</Option>
                      {questionType.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
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
                    style={{ width: "100%" }}
                    name="questionLevel"
                    className=" form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose level!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="">Choose level</Option>
                      {questionLevel.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
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
                    style={{ width: "100%" }}
                    name="questionCategory"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose category!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value={0}>Choose category</Option>
                      {categoriesList?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* title */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="readingTitle">
                    <span className="mt-2 mr-1">Title</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="readingTitle"
                    className="form-add-item"
                  >
                    <TextArea placeholder="Enter question title" />
                  </Form.Item>
                </div>

                {/* Paragraph */}
                <div className="col-md-12">
                  <label className="quest-label" htmlFor="paragraph">
                    <span className="required mt-2 mr-1">*</span> Paragraph
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="paragraph"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input paragraph!",
                      },
                    ]}
                  >
                    <TextArea placeholder="Enter paragraph " />
                  </Form.Item>
                </div>

                <div className="col-md-12">
                  <label className="quest-label" htmlFor="translate">
                    <span className="mt-2 mr-1">Translate</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="translate"
                    className="form-add-item"
                  >
                    <TextArea placeholder="Enter translate " />
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
                    style={{ width: "100%" }}
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
                      setOpenAddQuestion(true);
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
                    Add New Reading
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setOpenFormReadingQuestion(false);
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
  );
};

export default FormAddReadingQuestion;
