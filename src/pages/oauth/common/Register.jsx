import React from "react";
import { Form, Input } from "antd";
import HvxButton from "../../../components/button/HvxButton";
import { registerRequest } from "../../../services/authService";
import {
  notificationErr,
  notificationSuccess,
} from "../../../utils/Notification";

const Register = ({ setLoading, setIsModalOpen, isModalOpen }) => {
  const onFinish = async (values) => {
    setLoading(true);
    let param = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      username: values.username,
      password: values.password,
    };
    setIsModalOpen(false);

    registerRequest(param, getRegisterResponse, getError);
  };

  const getRegisterResponse = () => {
    setLoading(false);
    notificationSuccess("Resgiter success!");
  };

  const getError = (error) => {
    setLoading(false);
    const err = error.response;
    notificationErr(err?.data?.message || "Something went wrong :(");
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="loginForm">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        {...layout}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            { required: true, message: "Please input your first name!" },
            { max: 20, message: "Max length 20 character" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            { required: true, message: "Please input your last name!" },
            { max: 20, message: "Max length 20 character" },
          ]}
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

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { max: 20, message: "Max length 20 character" },
            { min: 5, message: "Min length 6 character" },
            {
              validator: (_, value) =>
                // eslint-disable-next-line
                /[^a-zA-Z0-9\-\/]/.test(value)
                  ? Promise.reject(
                      new Error("Username cannot contain special characters")
                    )
                  : Promise.resolve(),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="password-input"
          rules={[
            { required: true, message: "Please input your password!" },
            { max: 20, message: "Max length 20 character" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
          <HvxButton type="primary" htmlType="submit" text="Register" />
        </div>
      </Form>
    </div>
  );
};

export default Register;
