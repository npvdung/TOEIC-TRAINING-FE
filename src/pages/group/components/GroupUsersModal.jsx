import { Button, Modal } from "antd";

export const GroupUserModal = ({
  isModalOpen,
  setIsModalOpen,
  users,
  handleDeleteUser,
}) => {
  return (
    <Modal
      title="Users"
      visible={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      footer={null}
    >
      {users.map((user) => {
        return (
          <div className="user-in-group-item">
            <span>{`${user.firstName} ${user.lastName}`}</span>
            <Button
              type="danger"
              onClick={() => {
                handleDeleteUser(user.id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </Modal>
  );
};
