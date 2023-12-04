import React from "react";
import { Modal, Form, Input } from "antd";
import { getUserInfo } from "../../utils/storage";
import HvxButton from "../../components/button/HvxButton";
import { notificationSuccess } from "../../utils/Notification";
export default function UpdateInfo({
  setIsOpenUpdateModal,
  isOpenUpdateModal,
  setRefetch,
  refetch,
}) {
  const user = getUserInfo();
  console.log(user);
  const id = user.id;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const onFinish = async (values) => {
    const axios = require("axios");
    console.log(values, "value");
    let data = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
    };
    console.log(data, "data");

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_API_URL}/users/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(config.url);

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem(
          "_currentUser",
          JSON.stringify(response.data.data)
        );
        setRefetch(Date.now());
        notificationSuccess("Update successfully");
        setIsOpenUpdateModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      {...layout}
      initialValues={{
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
      }}
    >
      <Form.Item
        label="First Name"
        name="firstname"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastname"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
        <HvxButton type="primary" htmlType="submit" text="Update" />
      </div>
    </Form>
  );
}
