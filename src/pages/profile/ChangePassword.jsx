import React from "react";
import { Modal, Form, Input } from "antd";
import HvxButton from "../../components/button/HvxButton";

export default function ChangePassword({ setIsOpenChangePass }) {
  const onFinish = () => {};
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
