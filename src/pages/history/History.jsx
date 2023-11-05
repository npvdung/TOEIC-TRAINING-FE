import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listQuestionRequest } from "../../services/gameService";
import { getResultDetail } from "../../services/resultService";
import { notificationWarning } from "../../utils/Notification";
import { getUserInfo } from "../../utils/storage";
import Header from "../home/header/Header";
import './style.scss'

const History = () => {
  const params = useParams();
  const currentUser = getUserInfo();

  const [resultDetail, setResultDetail] = useState();

  useEffect(() => {
    getResultDetail(
      params?.id,
      (res) => {
        setResultDetail(res.data.data);
      },
      (err) => {
        console.log(err.response);
        notificationWarning(
          err.response.data.message || "Some thing went wrong"
        );
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultDetail?.examId) {
      listQuestionRequest(
        {
          examId: resultDetail?.examId,
          userId: currentUser?.id,
        },
        (res) => {
          console.log(res);
        },
        () => {
          notificationWarning("Can not get history");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, resultDetail]);
  
  return (
    <div className="history-page">
      <Header />
      <div className="history-main">
          <div className="history-info">
                
          </div>
      </div>
    </div>
  );
};

export default History;
