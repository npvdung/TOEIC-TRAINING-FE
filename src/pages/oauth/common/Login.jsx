import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoginOutlined,
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

const Login = ({ setLoading }) => {
  const history = useHistory();
  const usernameRemember = getUsernameRemember();
  const [showPass, setShowPass] = useState(false);

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
          <Input className="hvx-input" />
        </Form.Item>
        <label htmlFor="password" className="ml-2 mt-4">
          Password
        </label>
        <div className="posPass">
          <Form.Item
            name="password"
            className="password-input"
            rules={[
              { required: true, message: "Please input your password!" },
              { max: 20, message: "Max length 20 character" },
            ]}
          >
            <Input
              type={showPass ? "text" : "password"}
              className="hvx-input"
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

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <HvxButton
            type="primary"
            htmlType="submit"
            text="login"
            icon={<LoginOutlined className="login-button-icon" />}
            className="hvx-btn-login"
          >
            Login
          </HvxButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
