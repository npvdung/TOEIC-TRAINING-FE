import React, { useState } from "react";
import ForgotPass from "./common/ForgotPass";
import Login from "./common/Login";
import Register from "./common/Register";
import "./style.scss";
import { Spin, Modal } from "antd";
import Logo from "../../assets/logo/logo.png";

const Oauth = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
          backgroundColor: "#f8f9fa",
        }}
      >
        TOEIC TRAINING
      </h1>
      <div className="hvx-loginPage">
        <div className="container center">
          <div className="hvx-formLogin">
            <Spin spinning={loading}>
              <div className="logo">
                <img className="logo-img" src="logo.png" alt="Logo" />
                <div className="text-logo"></div>
              </div>
              <div className="hvx-menuSelect">
                <h3>Login</h3>
              </div>
              <div className="center">
                <Login
                  setLoading={setLoading}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </Spin>
          </div>
        </div>

        <Modal
          title="Create account"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Register setLoading={setLoading} setIsModalOpen={setIsModalOpen} />
        </Modal>

        <div className="poster-img">
          <img src="logo2.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Oauth;
