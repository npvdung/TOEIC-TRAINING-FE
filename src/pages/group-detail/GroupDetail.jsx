import { useParams } from "react-router-dom/cjs/react-router-dom";
import Sidebar from "../home/sidebar/Sidebar";
import Content from "../home/midContent/Content";
import Rate from "../home/rate/Rate";
import Header from "../home/header/Header";
import "./group-detail.scss";
import { GroupMenu } from "./components/GroupMenu";
import { useMemo, useState } from "react";
import QuestionDashboard from "../dashboard/components/question/QuestionDashboard";
import ReadingQuestionDashboard from "../dashboard/components/readingQuestion/ReadingQuestionDashboard";
import ExamDashboard from "../dashboard/components/exam/ExamDashboard";

export const GroupDetail = () => {
  let { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const content = useMemo(() => {
    switch (selectedIndex) {
      case 1:
        return <QuestionDashboard />;
      case 2:
        return <ReadingQuestionDashboard />;
      case 3:
        return <ExamDashboard groupId={id} />;
      case 0:
        return (
          <div className="content">
            <div className="row">
              <Content currentMenu={9} groupId={id} />
              <Rate />
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }, [selectedIndex, id]);

  return (
    <div className="group-detail-page">
      <Header />
      <div className="group-detail">
        <GroupMenu
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="content">{content}</div>
      </div>
    </div>
  );
};
