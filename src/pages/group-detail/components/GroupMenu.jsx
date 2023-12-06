import { useHistory } from "react-router-dom/cjs/react-router-dom";
import HvxButton from "../../../components/button/HvxButton";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const GroupMenu = ({ selectedIndex, setSelectedIndex }) => {
  let history = useHistory();
  const playExams = () => {
    setSelectedIndex(0);
  };

  return (
    <>
      <div className="group-menu">
        <p
          className="title"
          onClick={() => {
            history.push("/group");
          }}
        >
          Groups
        </p>
        <ul>
          <li
            className={`group-menu-item ${selectedIndex === 1 && "selected"}`}
            onClick={() => {
              setSelectedIndex(1);
            }}
          >
            Questions
          </li>
          <br />
          <li
            className={`group-menu-item ${selectedIndex === 2 && "selected"}`}
            onClick={() => {
              setSelectedIndex(2);
            }}
          >
            Reading questions
          </li>
          <br />
          <li
            className={`group-menu-item ${selectedIndex === 3 && "selected"}`}
            onClick={() => {
              setSelectedIndex(3);
            }}
          >
            Exams
          </li>
        </ul>
        <br />
        <br />
        <br />
        <Button onClick={playExams} className="btn-dashboard">
          <PlayCircleOutlined />
          Play Exams
        </Button>
      </div>
    </>
  );
};
