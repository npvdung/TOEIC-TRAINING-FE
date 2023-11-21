import { Button, Form, Input, Modal, Radio, Spin } from "antd";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateExam } from "../../../../services/examService";
import { listQuestionRequest } from "../../../../services/gameService";
import { notificationWarning } from "../../../../utils/Notification";
import { getUserInfo } from "../../../../utils/storage";
// import QuestionDetailItem from './QuestionDetailItem'
import "./style.scss";
import { Eye } from "react-bootstrap-icons";
import { renderHTMLtoWord } from "../../../../constants/dashboardConstants";
import { fetchCategories } from "../../../../services/categoriesService";

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
                      return <RenderReading key={index} reading={reading} />;
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
                    } else if (
                      question.questionCategory === category.id &&
                      question.readingId != null
                    ) {
                      count = count + 1;
                      return (
                        <ViewQuestion
                          key={index}
                          question={question}
                          stt={index + 1}
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
const FormEditExam = ({ examId, category, setRefetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examInfo, setExamInfo] = useState();
  const [mode, setMode] = useState("view");
  const currentUser = getUserInfo();

  const handleEditExam = (value) => {
    Swal.fire({
      title: "Do you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          examId: examId,
          examName: value?.examName,
          totalTime: value?.time,
        };
        setLoading(true);
        updateExam(
          payload,
          (res) => {
            setLoading(false);
            setIsModalVisible(false);
            setRefetch(Date.now());
          },
          (err) => {
            console.log(err.response);
            setLoading(false);
          }
        );
      }
    });
  };

  useEffect(() => {
    if (examId) {
      listQuestionRequest(
        {
          examId: examId,
          userId: currentUser?.id,
        },
        (res) => {
          setExamInfo(res.data);
        },
        () => {
          notificationWarning("Can not get exam info");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  return (
    <div>
      <Button onClick={() => setIsModalVisible(true)}>
        <Eye />
      </Button>
      <Modal
        title="Exam Infomation"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={1200}
        centered
      >
        <Spin spinning={loading}>
          <Form
            onFinish={handleEditExam}
            initialValues={{
              examName: examInfo?.examName,
              time: examInfo?.totalTime,
            }}
            className="form-edit-exam"
          >
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  style={{ width: "100%" }}
                  name="examName"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your category name!",
                    },
                    {
                      max: 50,
                      message: "Category name too long!",
                    },
                  ]}
                >
                  <Input
                    disabled={mode === "view"}
                    placeholder="Enter category name"
                  />
                </Form.Item>
              </div>
              <div className="col-md-3">
                <label>
                  Category: <b>{category}</b>
                </label>
              </div>
              <div className="col-md-2">
                <Form.Item
                  style={{ width: "100%" }}
                  name="time"
                  label="Time"
                  rules={[
                    {
                      required: true,
                      message: "Please input time!",
                    },
                    () => ({
                      validator(_, value) {
                        if (!/\D/.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter the number!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    disabled={mode === "view"}
                    placeholder="Enter category name"
                  />
                </Form.Item>
              </div>
              <div className="col-md-2">
                <label>
                  Point: <b>{examInfo?.totalPoint}</b>
                </label>
              </div>
            </div>

            <div className="row exam-content">
              {
                examInfo?.data?.length > 0 && (
                  <ExamContent
                    listQuestion={examInfo?.data}
                    readingList={examInfo?.readingList}
                  />
                )
                // examInfo?.data.map((item, index) => (
                //   <QuestionDetailItem item={item} index={index} key={index} />
                // ))}
              }
            </div>

            <Form.Item>
              <Button
                htmlType="button"
                className="btn-dashboard-outline mt-2"
                onClick={() => setIsModalVisible(false)}
              >
                Close
              </Button>
              {mode === "view" && (
                <Button
                  htmlType="button"
                  className="btn-dashboard mt-2 ml-2"
                  onClick={() => setMode("edit")}
                >
                  Edit
                </Button>
              )}
              {mode === "edit" && (
                <Button htmlType="submit" className="btn-dashboard mt-2 ml-2">
                  Done
                </Button>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default FormEditExam;
