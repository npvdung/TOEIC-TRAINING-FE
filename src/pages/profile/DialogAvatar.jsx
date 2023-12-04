import React, { useState } from "react";
import { Avatar, Button, Modal, Upload } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import {
  notificationSuccess,
  notificationWarning,
} from "../../utils/Notification";
import { updateUser } from "../../services/userService";
import { getToken, getUserInfo } from "../../utils/storage";
import { message } from "antd";
import axios from "axios";

const DialogAvatar = ({ setAvatar, setRefetch }) => {
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const token = getToken();

  // const beforeUpload = (file) => {
  // const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name);
  //   if (!isImage) {
  //     message.error(
  //       "Chỉ được tải lên các file ảnh có đuôi jpg, jpeg, png, gif!"
  //     );
  //   }
  //   return isImage;
  // };

  const uploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_BASE_API_URL}/users/profile/avatars`,
    beforeUpload: (file) => {
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name);
      if (!isImage) {
        message.error("Bạn chỉ có thể tải lên tệp hình ảnh!");
      }
      return isImage;
    },
    onChange(info) {
      if (info.file.status === "done") {
        // Get this url from response in real world.
        const file = info.file.originFileObj;
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post(
            `${process.env.REACT_APP_BASE_API_URL}/users/profile/avatars`,
            formData,
            {
              headers: {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            message.success(
              `Tệp ${info.file.name} đã được tải lên thành công.`
            );
          })
          .catch(() => {
            message.error(`Tệp ${info.file.name} tải lên thất bại.`);
          });
      } else if (info.file.status === "error") {
        message.error(`Tệp ${info.file.name} tải lên thất bại.`);
      }
    },
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
        // onOk={handleSubmit}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {imageUrl && (
          <p style={{ marginTop: 8 }}>
            <LinkOutlined /> {imageUrl}
          </p>
        )}
      </Modal>
    </div>
  );
};

export default DialogAvatar;
