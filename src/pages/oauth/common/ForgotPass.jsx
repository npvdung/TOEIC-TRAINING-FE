import React, { useState } from "react";
import { Form, Input } from "antd";
import HvxButton from "../../../components/button/HvxButton";

const ForgotPass = () => {
  const [isSentCode, setIsSentCode] = useState(true);
  return (
    <div>
      <Form>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Please enter your email:"
          required="true"
          rules={[{ message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {isSentCode ? (
          <>
            <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
              The code has been sent to your email. Please check
            </p>
            <Form.Item
              label="Please enter received code:"
              required="true"
              rules={[{ message: "Please input the code!" }]}
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <p style={{ color: "#94a3b8" }}>
            The code will be sent to your email
          </p>
        )}

        <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
          <HvxButton type="primary" htmlType="submit" text="Send code" />
        </div>
      </Form>
    </div>
  );
};

export default ForgotPass;
