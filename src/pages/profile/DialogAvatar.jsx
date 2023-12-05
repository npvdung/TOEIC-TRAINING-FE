import React, { useState } from "react";
import { Avatar, Button, Modal, Upload } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { UploadOutlined, LinkOutlined } from "@ant-design/icons";
import {
  notificationSuccess,
  notificationWarning,
} from "../../utils/Notification";
import { message } from "antd";
import { getToken } from "../../utils/storage";
import HvxButton from "../../components/button/HvxButton";

const DialogAvatar = ({ setRefetch }) => {
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const token = getToken();

  const beforeUpload = (file) => {
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name);
    if (!isImage) {
      message.error("Only upload file ending by jpg, jpeg, png, gif!");
    }
    return isImage;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj !== null) {
      setLoading(false);
      setAvatarFile(info.file.originFileObj);
      setImageUrl(info.file.name);
    }
    console.log(info.file);
  };

  const handleSubmit = () => {
    const axios = require("axios");
    let data = new FormData();
    data.append("file", avatarFile); // Truyền đối tượng File vào FormData

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_API_URL}/users/profile/avatars`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        notificationSuccess("Update avatar successfully");
        setRefetch(Date.now());
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalUpload(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalUpload(true)}
        style={{ border: "none", cursor: "pointer" }}
        icon={<CameraOutlined style={{ fontSize: 30, marginTop: 10 }} />}
      ></Button>
      <Modal
        title="Update avatar"
        visible={isModalUpload}
        onCancel={() => setIsModalUpload(false)}
        footer={null} // Thêm dòng này để ẩn nút mặc định của Modal
      >
        <Upload
          action={false}
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {imageUrl && (
          <p style={{ marginTop: 8 }}>
            <LinkOutlined /> {imageUrl}
          </p>
        )}
        <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
          <HvxButton
            type="primary"
            htmlType="submit"
            text="Submit"
            onClick={handleSubmit}
          />{" "}
          {/* Thêm sự kiện onClick vào đây */}
        </div>
      </Modal>
    </div>
  );
};

export default DialogAvatar;
