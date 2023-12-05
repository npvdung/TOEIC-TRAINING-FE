import { Button } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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
        console.log("Content copied to clipboard");
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
        <span
          onClick={(e) => {
            e.stopPropagation();
            copyToClipBoard(groupCode);
          }}
        >
          {groupCode}
        </span>
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
