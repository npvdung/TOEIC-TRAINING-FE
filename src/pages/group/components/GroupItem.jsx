import { Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { notificationSuccess } from "../../../utils/Notification";

export const GroupItem = ({
  groupId,
  groupName,
  groupCode,
  handleDelete,
  handleView,
}) => {
  let history = useHistory();

  const copyToClipBoard = (groupCode) => {
    navigator.clipboard.writeText(groupCode).then(
      () => {
        notificationSuccess("Copy code to clipboard");
      },
      () => {
        console.error("Failed to copy");
      }
    );
  };

  return (
    <div
      className="group-item"
      onClick={() => {
        history.push(`/group/${groupId}`);
      }}
    >
      <div className="group-left">{groupName}</div>
      <div className="group-right">
        <Button
          type="primary"
          style={{
            borderRadius: "10px",
            backgroundColor: "green",
            border: "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            copyToClipBoard(groupCode);
          }}
        >
          {groupCode}
        </Button>
        <Button
          type="primary"
          style={{ borderRadius: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
            handleView(groupId);
          }}
        >
          View
        </Button>
        <Button
          type="danger"
          style={{ borderRadius: "10px" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(groupId);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
