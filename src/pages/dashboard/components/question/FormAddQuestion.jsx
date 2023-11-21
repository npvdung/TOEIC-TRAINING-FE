import React, { useEffect, useState } from "react";
import { Button, Form, Select, Modal } from "antd";
import {
  questionLevel,
  questionPoint,
  questionType,
  QUESTION_CHOOSE_ABCD,
  QUESTION_READING,
} from "../../../../constants/dashboardConstants";
import { getContentABCD } from "../../../../utils/questionTools";
import moment from "moment";
import {
  notificationErr,
  notificationSuccess,
} from "../../../../utils/Notification";
import { getUserInfo } from "../../../../utils/storage";
import { createQuestion } from "../../../../services/questionService";
import { fetchCategories } from "../../../../services/categoriesService";
import "./style.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const FormAddQuestion = ({
  setLoading,
  setRefetch,
  openAddForm,
  setOpenAddForm,
  addQuestionToReading,
  questionList,
  setQuestionList,
}) => {
  const [questTypeSelected, setQuestTypeSelected] =
    useState(QUESTION_CHOOSE_ABCD);
  const [categoriesList, setCategoriesList] = useState([]);
  const userInfo = getUserInfo();
  const [form] = Form.useForm();
  const [question, setQuestion] = useState({
    questionTitle: "",
    questionContent: "",
    questionAnswer: "",
    questionDescription: "",
    explanation: "",
  });

  const [optionAnswer, setOptionAnswer] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });

  const onReset = () => {
    form.resetFields();
  };

  const handleAddQuestion = (value) => {
    if (value) {
      const { questionType, questionLevel, questionCategory, questionPoint } =
        value;

      const newQuestion = {
        questionType,
        questionLevel,
        questionCategory,
        questionPoint: questionPoint || 5,
        questionTitle: question?.questionTitle || "",
        questionDescription: question?.questionDescription || "",
        questionAnswer: question?.questionAnswer || "no answer",
        questionExam: 0,
        questionContent: getContentABCD(optionAnswer),
        explanation: question?.explanation || "",
        createdBy: userInfo?.id,
        createdAt: moment(Date.now()).format("YYYY/MM/DD"),
      };

      if (addQuestionToReading) {
        const temp = [...questionList];
        temp.push(newQuestion);
        setQuestionList(temp);
        setOpenAddForm(false);
        onReset();
      } else {
        setLoading(true);
        createQuestion(
          newQuestion,
          () => {
            setRefetch(Date.now());
            setLoading(false);
            setOpenAddForm(false);
            onReset();
            notificationSuccess("Create successfully");
          },
          () => setLoading(false)
        );
      }
    }
  };

  useEffect(() => {
    fetchCategories(
      (res) => setCategoriesList(res.data.data),
      () => notificationErr("Oop something went wrong")
    );
  }, []);

  const renderFormAnswer = (questType) => {
    if (questType) {
      if (questType === QUESTION_CHOOSE_ABCD) {
        return (
          <div className="col-md-12">
            <label className="quest-label" htmlFor="Content">
              <span className="required mt-2 mr-1">*</span> Content
            </label>
            <div className="row pl-2 pr-2">
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionA"
                  className="form-add-item"
                  label="A"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option A!",
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={optionAnswer.optionA}
                    onChange={(value) =>
                      setOptionAnswer({ ...optionAnswer, optionA: value })
                    }
                    placeholder="Enter option A"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionB"
                  className="form-add-item"
                  label="B"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option B!",
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={optionAnswer.optionB}
                    onChange={(value) =>
                      setOptionAnswer({ ...optionAnswer, optionB: value })
                    }
                    placeholder="Enter option B"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionC"
                  className="form-add-item"
                  label="C"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option C!",
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={optionAnswer.optionC}
                    onChange={(value) =>
                      setOptionAnswer({ ...optionAnswer, optionC: value })
                    }
                    placeholder="Enter option C"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6">
                <Form.Item
                  style={{ width: "100%" }}
                  name="optionD"
                  className="form-add-item"
                  label="D"
                  rules={[
                    {
                      required: true,
                      message: "Please enter option D!",
                    },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    value={optionAnswer.optionD}
                    onChange={(value) =>
                      setOptionAnswer({ ...optionAnswer, optionD: value })
                    }
                    placeholder="Enter option D"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <Modal
      title="Add question"
      centered
      visible={openAddForm}
      onCancel={() => {
        setOpenAddForm(false);
        onReset();
      }}
      width={1000}
    >
      <Form
        form={form}
        onFinish={handleAddQuestion}
        initialValues={{
          questionType: QUESTION_CHOOSE_ABCD,
          questionPoint: 5,
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
                  <Select
                    onChange={(value) => setQuestTypeSelected(value)}
                    disabled
                  >
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

              {/* Point */}
              {questTypeSelected !== QUESTION_READING && (
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionPoint">
                    <span className="required mt-2 mr-1">*</span> Point
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionPoint"
                    className="form-add-item"
                  >
                    <Select disabled>
                      <Option value={0}>Choose Point</Option>
                      {questionPoint?.map((point) => (
                        <Option key={point.id} value={point.value}>
                          {point.value}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              )}

              {/* title */}
              <div className="col-md-6">
                <label className="quest-label" htmlFor="questionType">
                  <span className="mt-2 mr-1">Title</span>
                </label>
                <Form.Item
                  style={{ width: "100%" }}
                  name="questionTitle"
                  className="form-add-item"
                >
                  <ReactQuill
                    theme="snow"
                    name="questionTitle"
                    value={question.questionTitle}
                    onChange={(value) =>
                      setQuestion({ ...question, questionTitle: value })
                    }
                    placeholder="Enter question title"
                  />
                </Form.Item>
              </div>

              {/* Description */}
              {questTypeSelected === QUESTION_CHOOSE_ABCD && (
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionDescription">
                    <span className="mt-2 mr-1">Description</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionDescription"
                    className="form-add-item"
                    rules={[
                      {
                        max: 500,
                        message: "Description too long!",
                      },
                    ]}
                  >
                    <ReactQuill
                      theme="snow"
                      name="questionDescription"
                      value={question.questionDescription}
                      onChange={(value) =>
                        setQuestion({ ...question, questionDescription: value })
                      }
                      placeholder="Enter question title"
                    />
                  </Form.Item>
                </div>
              )}

              {/* Content */}
              {questTypeSelected === QUESTION_CHOOSE_ABCD &&
                renderFormAnswer(questTypeSelected)}

              {/* Answer */}
              {questTypeSelected === QUESTION_CHOOSE_ABCD && (
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionAnswer">
                    <span className="required mt-2 mr-1">*</span> Answer
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="questionAnswer"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please input your question answer!",
                      },
                      {
                        max: 200,
                        message: "Answer name too long!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            getFieldValue("questionType") !==
                              QUESTION_CHOOSE_ABCD ||
                            getFieldValue("optionA") === value ||
                            getFieldValue("optionB") === value ||
                            getFieldValue("optionC") === value ||
                            getFieldValue("optionD") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The answer does not match one of the options!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <ReactQuill
                      theme="snow"
                      name="questionAnswer"
                      value={question.questionAnswer}
                      onChange={(value) =>
                        setQuestion({ ...question, questionAnswer: value })
                      }
                      placeholder="Enter question answer"
                    />
                  </Form.Item>
                </div>
              )}

              {/* Explanation */}
              {questTypeSelected === QUESTION_CHOOSE_ABCD && (
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="explanation">
                    <span className="mt-2 mr-1">Explanation</span>
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="explanation"
                    className="form-add-item"
                  >
                    <ReactQuill
                      theme="snow"
                      name="explanation"
                      value={question.explanation}
                      onChange={(value) =>
                        setQuestion({ ...question, explanation: value })
                      }
                      placeholder="Enter explanation"
                    />
                  </Form.Item>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="row pl-2">
              <Form.Item>
                <Button htmlType="submit" className="btn-dashboard ml-2">
                  Add
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    setOpenAddForm(false);
                    onReset();
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
  );
};

export default FormAddQuestion;
