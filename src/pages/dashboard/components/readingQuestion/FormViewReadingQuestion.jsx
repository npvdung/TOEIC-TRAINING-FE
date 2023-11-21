import React, { useEffect, useState } from "react";
import { Button, Input, Form, Select, Modal, Table } from "antd";
import {
  questionLevel,
  questionType,
  QUESTION_READING,
  renderHTMLtoWord,
} from "../../../../constants/dashboardConstants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.scss";
import { Eye } from "react-bootstrap-icons";
import FormViewQuestion from "../question/FormViewQuestion";

const { Option } = Select;

const FormViewReadingQuestion = ({ question, setRefetch, categoriesList }) => {
  const [visible, setVisible] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [readingQuestion, setReadingQuestion] = useState(question);
  const [form] = Form.useForm();

  useEffect(() => {
    setReadingQuestion(question);
    setQuestionList(question?.questionList);
  }, [question]);

  const columns = [
    {
      title: "Title",
      dataIndex: "questionTitle",
      width: "50%",
      key: "questionTitle",
      render: (questionTitle) => (
        <div className="quest-content-html">
          {renderHTMLtoWord(questionTitle)}
        </div>
      ),
    },
    {
      title: "Content",
      dataIndex: "questionContent",
      width: "40%",
      key: "questionContent",
      render: (questionContent) => (
        <div className="quest-content-html">
          {renderHTMLtoWord(questionContent)}
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <FormViewQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
            />
          </div>
        );
      },
      width: "10%",
    },
  ];
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Button
        className="mr-1"
        onClick={() => setVisible(true)}
        title="View Reading Question"
      >
        <Eye />
      </Button>
      <Modal
        title="View reading question"
        centered
        visible={visible}
        onCancel={() => {
          setVisible(false);
          onReset();
        }}
        width={1000}
      >
        <Form
          form={form}
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
                  <label className="quest-label" htmlFor="level">
                    <span className="required mt-2 mr-1">*</span> Level
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="level"
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
                  <label className="quest-label" htmlFor="categoryId">
                    <span className="required mt-2 mr-1">*</span> Category
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="categoryId"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose category!",
                      },
                    ]}
                  >
                    <Select defaultValue={0}>
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
                    style={{ width: "100%" }}
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
            {questionList?.length > 0 && (
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
                    onClick={() => {
                      setVisible(false);
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

export default FormViewReadingQuestion;
