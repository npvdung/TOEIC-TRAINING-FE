import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import {
  notificationSuccess,
  notificationWarning,
} from "../../utils/Notification";
import { updateUser } from "../../services/userService";
import { getUserInfo } from "../../utils/storage";

const DialogAvatar = ({ getValue = Function, setRefetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avtSelected, setAvtSelected] = useState();
  const user = getUserInfo();

  const avt1 = "https://i.ibb.co/09jdv0q/avt1.jpg";
  const avt2 = "https://i.ibb.co/5GHSBCC/avt2.jpg";
  const avt3 = "https://i.ibb.co/28m9x51/avt3.jpg";
  const avt4 = "https://i.ibb.co/x56ctv3/avt4.jpg";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (avtSelected) {
      setIsModalVisible(false);
      getValue(avtSelected);
      updateUser(
        { avatar: avtSelected, userId: user.id },
        (res) => {
          console.log(res);
          setRefetch(Date.now());
          notificationSuccess("Update success");
        },
        (err) => console.log(err)
      );
    } else {
      notificationWarning("Please choose avatar");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChooseAvt = (value) => {
    setAvtSelected(value);
  };
  return (
    <div>
      <CameraOutlined
        onClick={showModal}
        style={{ fontSize: 30, marginTop: 10, cursor: "pointer" }}
      />
      <Modal
        title="Avatar"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={800}
        footer={false}
      >
        <div className="avt-group justifySpaceBetween">
          <div onClick={() => handleChooseAvt(avt1)} id={avt1}>
            <img
              className={`avt-choose ${avtSelected === avt1 && "active-avt"}`}
              src={avt1}
              alt="avt1"
            />
          </div>
          <div onClick={() => handleChooseAvt(avt2)} id={avt2}>
            <img
              className={`avt-choose ${avtSelected === avt2 && "active-avt"}`}
              src={avt2}
              alt="avt2"
            />
          </div>
          <div onClick={() => handleChooseAvt(avt3)} id={avt3}>
            <img
              className={`avt-choose ${avtSelected === avt3 && "active-avt"}`}
              src={avt3}
              alt="avt3"
            />
          </div>
          <div onClick={() => handleChooseAvt(avt4)} id={avt4}>
            <img
              className={`avt-choose ${avtSelected === avt4 && "active-avt"}`}
              src={avt4}
              alt="avt4"
            />
          </div>
        </div>
        <div className="center">
          {" "}
          <Button onClick={handleOk}>Ok</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DialogAvatar;
