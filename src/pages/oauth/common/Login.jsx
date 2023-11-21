import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Modal } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoginOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import HvxButton from "../../../components/button/HvxButton";
import { useHistory } from "react-router-dom";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";
import { checkDataInLocalStorage, isLogin } from "../../../utils/CheckData";
import { notificationErr } from "../../../utils/Notification";
import { loginRequest } from "../../../services/authService";
import {
  saveUsername,
  clearUsername,
  getUsernameRemember,
  saveUserInfo,
} from "../../../utils/storage";
import ForgotPass from "./ForgotPass";

const Login = ({ setLoading, setIsModalOpen }) => {
  const history = useHistory();
  const usernameRemember = getUsernameRemember();
  const [showPass, setShowPass] = useState(false);
  const [isModalForgetOpen, setIsModalForgetOpen] = useState(false);

  useEffect(() => {
    if (isLogin()) {
      history.push(ROUTER_CONST.home);
    }
  }, [history]);

  const onFinish = async (values) => {
    // console.log(values)
    if (values?.remember) {
      saveUsername(values.username);
    } else {
      clearUsername();
    }
    setLoading(true);
    let params = {
      username: values.username,
      password: values.password,
    };
    loginRequest(params, getResponseLogin, getError);
  };

  const getResponseLogin = (response) => {
    const res = response.data;
    setLoading(false);
    saveUserInfo(res.data.token, res.data);
    localStorage.setItem("_token", res.data.token);
    localStorage.setItem("_currentUser", JSON.stringify(res.data));
    let redirectUrl = localStorage.getItem("urlBeforeLogin");
    if (checkDataInLocalStorage(redirectUrl)) {
      history.push(redirectUrl);
    } else {
      history.push(ROUTER_CONST.home);
    }
  };

  const getError = (err) => {
    console.log(err?.response);
    setLoading(false);
    if (err?.response?.status !== 400) {
      clearUsername();
    }
    notificationErr(
      err?.response?.data?.message || "Oops, something went wrong"
    );
  };

  return (
    <div className="loginForm ">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <label htmlFor="username" className="ml-2">
          Username
        </label>
        <Form.Item
          className="hvx-input"
          initialValue={usernameRemember || ""}
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="hvx-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <label htmlFor="password" className="ml-2 mt-4">
          Password
        </label>
        <div className="posPass">
          <Form.Item
            id="password"
            name="password"
            className="password-input"
            rules={[
              { required: true, message: "Please input your password!" },
              { max: 20, message: "Max length 20 character" },
            ]}
          >
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              className="hvx-input"
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <div className="eye" onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeOutlined className="eye-icon" />
            ) : (
              <EyeInvisibleOutlined className="eye-icon" />
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <button
            onMouseOver={(e) => (e.target.style.opacity = "0.7")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
            style={{
              border: "none",
              backgroundColor: "white",
              opacity: "0.7",
              cursor: "pointer",
              paddingBottom: "12px",
              color: "#94a3b8",
              outline: "none",
            }}
            onClick={() => setIsModalForgetOpen(true)}
            type="button"
          >
            Forget password
          </button>
        </div>

        <Modal
          title="Reset password"
          visible={isModalForgetOpen}
          onCancel={() => setIsModalForgetOpen(false)}
          footer={null}
        >
          <ForgotPass setIsModalForgetOpen={setIsModalForgetOpen} />
        </Modal>

        <Form.Item>
          <div className="hvx-btn-login">
            <HvxButton
              type="primary"
              htmlType="submit"
              text="Login"
              icon={<LoginOutlined className="login-button-icon" />}
            >
              Login
            </HvxButton>
          </div>
        </Form.Item>
      </Form>
      <button
        className="center create-acc-button"
        onClick={() => setIsModalOpen(true)}
      >
        If you don't have any account, create an account
      </button>
    </div>
  );
};

export default Login;
