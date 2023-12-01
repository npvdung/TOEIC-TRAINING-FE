import { Modal } from "antd";

export const GroupUserModal = ({ isModalOpen, setIsModalOpen, users }) => {
  return (
    <Modal
      title="Users"
      visible={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      footer={null}
    >
      {users.map((item) => {
        return <p>{`${item.firstName} ${item.lastName}`}</p>;
      })}
    </Modal>
  );
};
