import React, { useEffect, useState } from "react";
import { getHistory } from "../../../services/resultService";
import { notificationErr } from "../../../utils/Notification";
import { getUserInfo } from "../../../utils/storage";
import HistoryDetails from "./HistoryDetails";

const Sidebar = () => {
  const [historyList, setHistoryList] = useState([]);
  const [showHistoryDetails, setShowHistoryDetails] = useState(false);
  const [selectedExam, setSelectedExam] = useState({});

  const currentUser = getUserInfo();

  useEffect(() => {
    getHistory(
      currentUser.id,
      (res) => {
        setHistoryList(res.data.data.reverse());
      },
      () => notificationErr("Can not get history")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewDetailHistory = (exam) => {
    setShowHistoryDetails(true);
    setSelectedExam(exam);
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " sec";
  };

  return (
    <div className="col-md-3">
      <HistoryDetails
        show={showHistoryDetails}
        onClose={() => setShowHistoryDetails(false)}
        selectedExam={selectedExam}
      />
      <div className="center">
        <div className="home-rate">
          <div className="rate-header">
            <p className="rate-title">History</p>
          </div>
          <div className="list-item-history scrollbar">
            {historyList?.length > 0 &&
              historyList.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleViewDetailHistory(item)}
                >
                  <p>
                    <b>{item.examName || "No name"}</b>
                  </p>
                  <div className="history-info">
                    <p>
                      <b>Correct: </b>
                      {item.numberOfCorrect}/{item.totalRecords}
                    </p>
                    <p>
                      <b>Time: </b>
                      {millisToMinutesAndSeconds(item.totalTime)}
                    </p>
                    <p>
                      <b>Scores: </b>
                      {item.totalPoint}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
