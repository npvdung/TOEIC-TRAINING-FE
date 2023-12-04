import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo/logo.png";
import { Menu, Dropdown } from "antd";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";
import { clearUserInfo, getUserInfo } from "../../../utils/storage";
import { useHistory } from "react-router";
import "./style.scss";
import { getUser } from "../../../services/userService";
import { UserOutlined } from "@ant-design/icons";
import { ROLE_ADMIN } from "../../../constants/dashboardConstants";
import { getToken } from "../../../utils/storage";
import axios from "axios";

const Header = ({ refetch = false }) => {
  const user = getUserInfo();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const token = getToken();
    const avatar = getUserInfo().avatar;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Set responseType to 'blob'
    };

    axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}/users/profile/avatars/${avatar}`,
        config
      )
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setAvatarUrl(url);
      })
      .catch((error) => console.error("Error:", error));
    getUser(
      user.id,
      (res) => setUserInfo(res.data.data),
      (err) => console.log(err)
    );
    // eslint-disable-next-line
  }, [refetch]);

  const handleLogout = () => {
    clearUserInfo();
    history.push(ROUTER_CONST.login);
    // window.location.replace(ROUTER_CONST.login);
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0" onClick={() => history.push(ROUTER_CONST.profile)}>
        <span>Profile</span>
      </Menu.Item>

      {user?.role === ROLE_ADMIN && (
        <Menu.Item key="1" onClick={() => history.push(ROUTER_CONST.dashboard)}>
          <span>Dashboard</span>
        </Menu.Item>
      )}

      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="home-header">
      <div className="header-content">
        <div className="header-logo">
          <img className="header-logo-img" src={Logo} alt="Logo" />
          <div className="text-logo">
            <h1 onClick={() => history.push(ROUTER_CONST.home)}>
              TOEIC TRAINING
            </h1>
          </div>
        </div>

        <div className="header-info">
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="header-info-user">
              {userInfo?.avatar ? (
                <img
                  className="header-info-user-avatar"
                  src={avatarUrl}
                  alt="avatar"
                />
              ) : (
                <UserOutlined style={{ fontSize: 20 }} />
              )}

              <span className="header-info-user-name">
                {userInfo?.firstName}&nbsp;{userInfo?.lastName}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
