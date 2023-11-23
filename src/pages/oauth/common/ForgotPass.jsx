import React, { useState } from "react";
import { Form, Input } from "antd";
import HvxButton from "../../../components/button/HvxButton";

const ForgotPass = () => {
  const [isSentCode, setIsSentCode] = useState("default");
  const checkEmail = async (values) => {
    const axios = require("axios");
    let data = JSON.stringify({
      email: values.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_API_URL}/users/forget-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setIsSentCode("valid");
        }
      })
      .catch((error) => {
        setIsSentCode("error");
      });
  };
  return (
    <div>
      <Form onFinish={checkEmail}>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Please enter your email:"
          required="true"
          name="email"
          rules={[{ message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {isSentCode === "default" ? (
          <p style={{ color: "#94a3b8", marginBottom: "15px" }}>
            We will sent a verification link to your email.
          </p>
        ) : isSentCode === "error" ? (
          <p style={{ color: "red" }}>
            Your email is not in our system. Please try again.
          </p>
        ) : isSentCode === "valid" ? (
          <p style={{ color: "green" }}>
            We have sent a verification link to your email. Please check your
            email.
          </p>
        ) : null}

        <div className="hvx-btn-login" style={{ marginTop: "15px" }}>
          <HvxButton type="primary" htmlType="submit" text="Send link" />
        </div>
      </Form>
    </div>
  );
};

export default ForgotPass;
