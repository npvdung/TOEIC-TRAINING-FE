import React from "react";
import { Modal, Form, Input } from "antd";
import HvxButton from "../../components/button/HvxButton";
import { getUserInfo } from "../../utils/storage";
import { notificationErr, notificationSuccess } from "../../utils/Notification";

export default function ChangePassword({ setIsOpenChangePass }) {
  const user = getUserInfo();
  const onFinish = (values) => {
    const axios = require("axios");
    let data = JSON.stringify({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_API_URL}/users/change-password/${user.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsOpenChangePass(false);
        notificationSuccess("Password updated successfully");
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        notificationErr("Your old password is not match");
      });
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <Form name="basic" onFinish={onFinish} {...layout}>
        <Form.Item
          label="Old password"
          name="oldPassword"
          rules={[
            { required: true, message: "Please input your password!" },
            { max: 20, message: "Max length 20 character" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your password!" },
            { max: 20, message: "Max length 20 character" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
          <HvxButton type="primary" htmlType="submit" text="Update" />
        </div>
      </Form>
    </div>
  );
}
