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

  return (
    <div
      className="group-item"
      onClick={() => {
        history.push(`/group/${groupId}`);
      }}
    >
      <div className="group-left">{groupName}</div>
      <div className="group-right">
        <span>{groupCode}</span>
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
