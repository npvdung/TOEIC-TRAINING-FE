import { ClockCircleOutlined } from "@ant-design/icons";
import React from "react";
import "./style.scss";
import Timer from "./timer/Timer";
import { Link } from "react-scroll";

const Sidebar = ({
  listQuestion,
  activeQuestionList,
  handleFinishGame,
  totalTime,
}) => {
  // console.log(activeQuestionList);

  return (
    <div className="hvx-sidebarGame">
      <div className="hvx-sidebar-time center">
        <ClockCircleOutlined />{" "}
        <span className="ml-3">
          <Timer initialMinute={totalTime} initialSeconds={0} />
        </span>
      </div>

      <div className="hvx-countCompleted center">
        <span>
          Completed: {activeQuestionList ? activeQuestionList?.length : 0}/
          {listQuestion?.length}
        </span>
      </div>

      <div className="hvx-listQuestion mt-3">
        {listQuestion && listQuestion?.length > 0
          ? listQuestion.map((item, index) => {
              return (
                <Link
                  to={`quest${item?.id}`}
                  spy={true}
                  smooth={true}
                  offset={-300}
                  className="col-md-3 quest-item"
                  key={index}
                >
                  <span
                    className={`item ${
                      activeQuestionList.includes(item.id) ? "itemActive" : ""
                    }`}
                  >
                    {index + 1}
                  </span>
                </Link>
              );
            })
          : "No data"}
      </div>

      <div className="hvx-submit center mt-5">
        <button className="hvx-btnSubmit btn-7">
          <span onClick={handleFinishGame}>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
