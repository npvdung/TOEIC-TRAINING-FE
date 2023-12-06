import React, { useEffect, useState } from "react";
import { Button, Input, Spin } from "antd";
import Lesson from "./Lesson";
import { getExamListByCategory } from "../../../services/examService";
import "./style.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getExamList } from "../../../services/examService";

const { Search } = Input;

const Content = ({ currentMenu, groupId }) => {
  const [examList, setExamList] = useState();
  const [examListClone, setExamListClone] = useState();
  const [loadingData, setLoadingData] = useState(true);

  let history = useHistory();

  useEffect(() => {
    setLoadingData(true);
    getExamList(
      groupId,
      (res) => {
        setExamList(res.data.data);
        setExamListClone(res.data.data);
        setLoadingData(false);
      },
      getError
    );
    // eslint-disable-next-line
  }, [currentMenu]);

  const handleSearchExams = (value) => {
    if (!value.trim() || !value?.length) {
      setExamList(examListClone);
    } else {
      const newExams = examListClone.filter((exam) =>
        exam?.examName.toLowerCase().match(value.trim().toLowerCase())
      );
      setExamList(newExams);
    }
  };

  const getError = (err) => {
    console.log(err);
    setLoadingData(false);
  };

  return (
    <div className="col-md-9 midContent">
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
                style={{ width: "100%" }}
                className="search-input"
              />
            </div>
            <div className="col-md-6">
              <Button
                type="primary"
                style={{ height: "40px" }}
                onClick={() => {
                  history.push("/group");
                }}
              >
                Group
              </Button>
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
                );
              })
            ) : (
              <div className="center" style={{ width: "100%" }}>
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
  );
};

export default Content;
