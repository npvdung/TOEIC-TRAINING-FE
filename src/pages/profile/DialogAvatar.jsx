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
import { getUserInfo } from "../../utils/storage";
import { message } from "antd";
import fs from "fs";
import path from "path";
import { getToken } from "../../utils/storage";

const DialogAvatar = ({ setRefetch }) => {
  const [isModalUpload, setIsModalUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const token = getToken();
  const beforeUpload = (file) => {
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name);
    if (!isImage) {
      message.error(
        "Chỉ được tải lên các file ảnh có đuôi jpg, jpeg, png, gif!"
      );
    }
    return isImage;
  };

  const handleChange = (info) => {
    console.log(info.file, "truoc");
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj !== null) {
      setLoading(false);
      setAvatarFile(info.file.originFileObj); // Lưu đối tượng File thay vì tên tệp
      // setAvatar(URL.createObjectURL(info.file.originFileObj)); // Tạo URL cho tệp để hiển thị
    }
    console.log(info.file);
  };

  const handleSubmit = () => {
    const axios = require("axios");
    const FormData = require("form-data");

    let data = new FormData();
    data.append("file", avatarFile); // Truyền đối tượng File vào FormData

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8888/users/profile/avatars",
      headers: {
        Authorization: `Bearer ${token}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
        onOk={handleSubmit}
      >
        <Upload
          action={false}
          name="avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={({ file, onSuccess, onError }) => {
            const axios = require("axios");
            let data = new FormData();
            data.append("file", file); // Truyền đối tượng File vào FormData

            let config = {
              method: "post",
              maxBodyLength: Infinity,
              url: "http://localhost:8888/users/profile/avatars",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: data,
            };

            axios
              .request(config)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
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
