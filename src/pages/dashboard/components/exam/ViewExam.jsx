import { Button, Form, Input, InputNumber, Modal, Radio, Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCategories } from "../../../../services/categoriesService";
import { renderHTMLtoWord } from "../../../../constants/dashboardConstants";
import "./viewExam.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../../../utils/storage";
import { createExam } from "../../../../services/examService";
import {
  notificationSuccess,
  notificationWarning,
} from "../../../../utils/Notification";

const { Option } = Select;

const RenderReading = (props) => {
  const { reading } = props;
  return (
    <div>
      <div className="title-reading">{renderHTMLtoWord(reading?.title)}</div>
      <div className="paragraph-reading">
        {renderHTMLtoWord(reading?.paragraph)}
      </div>
    </div>
  );
};

const ExamContent = (props) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const { listQuestion, readingList } = props;
  let count = 0;

  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res.data.data);
    });
  }, []);
  return (
    <div className="hvx-contentGame ">
      <div className="hvx-mainContent">
        <div className="listItem">
          {categoriesList?.map((category, index) => {
            const checkCategory = listQuestion?.findIndex(
              (quest) => quest.questionCategory === category.id
            );
            if (checkCategory !== -1) {
              return (
                <div key={index}>
                  <div className="question-request">
                    {category.questionRequest}
                  </div>
                  {readingList?.map((reading, index) => {
                    if (reading.categoryId === category.id) {
                      return (
                        <>
                          <RenderReading key={index} reading={reading} />
                          {listQuestion?.map((question, index) => {
                            if (
                              question.questionCategory === category.id &&
                              question.readingId === reading.id
                            ) {
                              count = count + 1;
                              return (
                                <ViewQuestion
                                  key={index}
                                  question={question}
                                  stt={count}
                                />
                              );
                            }
                            return true;
                          })}
                        </>
                      );
                    }
                    return true;
                  })}
                  {listQuestion?.map((question, index) => {
                    if (
                      question.questionCategory === category.id &&
                      question.readingId == null
                    ) {
                      count = count + 1;
                      return (
                        <ViewQuestion
                          key={index}
                          question={question}
                          stt={count}
                        />
                      );
                    }
                    return true;
                  })}
                </div>
              );
            }
            return true;
          })}
        </div>
      </div>
    </div>
  );
};

const ViewQuestion = ({ question, stt }) => {
  const [objAnswer, setObjAnswer] = useState([]);

  useEffect(() => {
    const getAnswer = () => {
      if (question) {
        let ObjAnswer = question?.questionContent.split("|");
        setObjAnswer(ObjAnswer);
      }
    };
    getAnswer();
  }, [question]);

  return (
    <div
      className="hvx-questionItem itemChoose1of4"
      id={`quest${question?.id}`}
    >
      <p className="hvx-textTitleItem">
        <span style={{ fontWeight: "600", minWidth: "max-content" }}>
          Question {stt}.
        </span>
        <span>{renderHTMLtoWord(question.questionTitle)}</span>
      </p>
      <Radio.Group className="hvx-itemOption ml-3">
        <Radio className="col-md-6 option" value={objAnswer[0]}>
          <div
            className="d-flex"
            style={{ gap: "4px" }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "A.  ${objAnswer[0]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[1]}>
          <div
            className="d-flex"
            style={{ gap: "4px" }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[1]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[2]}>
          <div
            className="d-flex"
            style={{ gap: "4px" }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[2]}"}`).html,
            }}
          />
        </Radio>
        <Radio className="col-md-6 option" value={objAnswer[3]}>
          <div
            className="d-flex"
            style={{ gap: "4px" }}
            dangerouslySetInnerHTML={{
              __html: JSON.parse(`{"html": "B.  ${objAnswer[3]}"}`).html,
            }}
          />
        </Radio>
      </Radio.Group>
    </div>
  );
};

const ViewExam = (props) => {
  const { show, onClose, exam, setRefetch, totalPoint, groupId } = props;
  const userInfo = getUserInfo();
  const [categoriesList, setCategoriesList] = useState([]);
  const [form] = Form.useForm();

  const handleCreateRandomExam = (value) => {
    if (value) {
      const newExamValue = {
        examName: value.examName,
        totalPoint: totalPoint,
        userId: userInfo?.id,
        totalTime: value.totalTime,
        categoryId: value.examCategory,
        listQuestion: JSON.stringify(
          exam?.questionList?.map((question) => question.id)
        ),
        groupId,
      };
      createExam(
        newExamValue,
        () => {
          notificationSuccess("create new exam success!");
          onClose();
          setRefetch(Date.now());
        },
        (err) => {
          console.log(err.response);
          notificationWarning("Oop!!, Some thing went wrong!");
        }
      );
    }
  };

  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res.data.data);
    });
  }, []);

  return (
    <Modal
      title="Random Exam"
      centered
      visible={show}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      onOk={() => {}}
      width={1200}
      className="random-exam"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "block" } }}
    >
      <Form form={form} onFinish={handleCreateRandomExam}>
        <div className="col-md-12">
          <div className="row">
            {/* name */}
            <div className="col-md-3">
              <label className="quest-label" htmlFor="questionType">
                <span className="required mr-1">*</span> Name
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="examName"
                className="form-add-item"
                rules={[
                  {
                    required: true,
                    message: "Please input your question name!",
                  },
                  {
                    max: 50,
                    message: "Question name too long!",
                  },
                ]}
              >
                <Input placeholder="Enter exam name" />
              </Form.Item>
            </div>
            {/* category */}
            <div className="col-md-3">
              <label className="quest-label" htmlFor="questionCategory">
                <span className="required mr-1">*</span> Category
              </label>

              <Form.Item
                style={{ width: "100%" }}
                name="examCategory"
                className="form-add-item"
                rules={[
                  {
                    required: true,
                    message: "Please choose category!",
                  },
                ]}
                // initialValue={questionCategorySelected}
              >
                <Select
                  style={{ width: "100%" }}
                  // onChange={(value) => setQuestionCategorySelected(value)}
                >
                  <Option value="">Choose category</Option>
                  {categoriesList?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-3">
              <label className="quest-label" htmlFor="questionType">
                <span className="required mr-1">*</span>{" "}
                <ClockCircleOutlined className="mr-2" /> Time (minutes)
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="totalTime"
                className="form-add-item"
                rules={[
                  {
                    required: true,
                    message: "Please enter time!",
                  },
                ]}
              >
                <InputNumber placeholder="0" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <label className="quest-label" htmlFor="point">
                <span className="required mr-1">*</span> Point
              </label>

              <div
                className="pl-3 pb-1"
                style={{ fontSize: "18px", border: "1px solid #d9d9d9" }}
              >
                {totalPoint}
              </div>
            </div>
          </div>
        </div>
        <div className="random-exam-content">
          <ExamContent
            listQuestion={exam?.questionList}
            readingList={exam?.readingList}
          />
        </div>
        <div className="mt-4">
          <Button htmlType="submit" className="btn-dashboard">
            Create Exam
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ViewExam;
