import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  QuestionOutlined,
  BookOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import {
  DASHBOARD_USERS_MENU,
  DASHBOARD_CATEGORIES_MENU,
  DASHBOARD_EXAMS_MENU,
  DASHBOARD_HOME_MENU,
  DASHBOARD_QUESTIONS_MENU,
  DASHBOARD_READING_QUESTIONS_MENU,
  TOOLTIP_POSITION,
} from "../../../../constants/dashboardConstants";
import { useHistory } from "react-router-dom";
import { ROUTER_CONST } from "../../../../config/paramsConst/RouterConst";
import { getUserInfo } from "../../../../utils/storage";
import { getUser } from "../../../../services/userService";
import axios from "axios";
import { getToken } from "../../../../utils/storage";

const SidebarDashboard = ({ currentMenu }) => {
  const [isExpand, setIsExpand] = useState("");
  const history = useHistory();
  const user = getUserInfo();
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
      (res) => {
        setUserInfo(res.data.data);
      },
      (err) => console.log(err)
    );
    // eslint-disable-next-line
  }, []);

  const activeCurrentMenu = (curMenu) => {
    switch (curMenu) {
      case DASHBOARD_USERS_MENU:
        return history.push(ROUTER_CONST.user);
      case DASHBOARD_CATEGORIES_MENU:
        return history.push(ROUTER_CONST.categories);
      case DASHBOARD_EXAMS_MENU:
        return history.push(ROUTER_CONST.exams);
      case DASHBOARD_HOME_MENU:
        return history.push(ROUTER_CONST.dashboardHome);
      case DASHBOARD_QUESTIONS_MENU:
        return history.push(ROUTER_CONST.questions);
      case DASHBOARD_READING_QUESTIONS_MENU:
        return history.push(ROUTER_CONST.readingQuestions);
      default:
        history.push(ROUTER_CONST.dashboardHome);
        break;
    }
  };

  return (
    <div className={`sidebar ${isExpand}`}>
      <div className="sidebar-header">
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Back to dashboard"}
          color={"white"}
          destroyTooltipOnHide={!isExpand}
        >
          <div
            className="sidebar-responsive icon-back"
            onClick={() => history.goBack()}
          >
            <ArrowLeftOutlined className="sidebar-responsive-icon" />
          </div>
        </Tooltip>
        {isExpand ? (
          <div className="sidebar-responsive" onClick={() => setIsExpand("")}>
            <MenuFoldOutlined className="sidebar-responsive-icon" />
          </div>
        ) : (
          <div
            className="sidebar-responsive"
            onClick={() => setIsExpand("sidebar-expand")}
          >
            <MenuUnfoldOutlined className="sidebar-responsive-icon" />
          </div>
        )}
        {/* avatar user */}
        <div className="sidebar-user">
          <img src={avatarUrl} alt="avt" className="user-avt" />
        </div>
      </div>
      <div className="sidebar-menu">
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Home"}
          color={"white"}
          destroyTooltipOnHide={!isExpand}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_HOME_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_HOME_MENU)}
          >
            <HomeOutlined className="sidebar-menu-icon" />{" "}
            <span className="menu-item-text">Home</span>
          </div>
        </Tooltip>
        <Tooltip placement={TOOLTIP_POSITION} title={"Users"} color={"white"}>
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_USERS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_USERS_MENU)}
          >
            <UserOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Users</span>
          </div>
        </Tooltip>
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Categories"}
          color={"white"}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_CATEGORIES_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_CATEGORIES_MENU)}
          >
            <ApartmentOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Categories</span>
          </div>
        </Tooltip>
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Questions"}
          color={"white"}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_QUESTIONS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_QUESTIONS_MENU)}
          >
            <QuestionOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Questions</span>
          </div>
        </Tooltip>
        <Tooltip
          placement={TOOLTIP_POSITION}
          title={"Reading Questions"}
          color={"white"}
        >
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_READING_QUESTIONS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_READING_QUESTIONS_MENU)}
          >
            <ReadOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Reading Questions</span>
          </div>
        </Tooltip>
        <Tooltip placement={TOOLTIP_POSITION} title={"Exams"} color={"white"}>
          <div
            className={`sidebar-menu-item ${
              currentMenu === DASHBOARD_EXAMS_MENU && "active-menu"
            }`}
            onClick={() => activeCurrentMenu(DASHBOARD_EXAMS_MENU)}
          >
            <BookOutlined className="sidebar-menu-icon" />
            <span className="menu-item-text">Exams</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default SidebarDashboard;
