import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const GroupMenu = ({ selectedIndex, setSelectedIndex }) => {
  let history = useHistory();

  return (
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
          className={`group-menu-item ${selectedIndex === 0 && "selected"}`}
          onClick={() => {
            setSelectedIndex(0);
          }}
        >
          Questions
        </li>
        <li
          className={`group-menu-item ${selectedIndex === 1 && "selected"}`}
          onClick={() => {
            setSelectedIndex(1);
          }}
        >
          Reading questions
        </li>
        <li
          className={`group-menu-item ${selectedIndex === 2 && "selected"}`}
          onClick={() => {
            setSelectedIndex(2);
          }}
        >
          Exams
        </li>
      </ul>
    </div>
  );
};
