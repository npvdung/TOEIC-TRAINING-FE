import React, { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { getUserInfo } from "../../utils/storage";
import Header from "../home/header/Header";
import "./style.scss";
import {
  ArrowLeftOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Tooltip, Button, Modal } from "antd";
import DialogAvatar from "./DialogAvatar";
import axios from "axios";
import { getToken } from "../../utils/storage";
import { ROUTER_CONST } from "../../config/paramsConst/RouterConst";
import { useHistory } from "react-router-dom";
import { TOOLTIP_POSITION } from "../../constants/dashboardConstants";
import UpdateInfo from "./UpdateInfo";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const user = getUserInfo();
  const history = useHistory();
  const [refetch, setRefetch] = useState(0);
  const [userInfo, setUserInfo] = useState();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getUser(
      user.id,
      (res) => {
        setUserInfo(res.data.data);
        setAvatar(res.data.data.avatar);
        const token = getToken();
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Set responseType to 'blob'
        };
        console.log(avatar, "new ava");
        axios
          .get(
            `${process.env.REACT_APP_BASE_API_URL}/users/profile/avatars/${res.data.data.avatar}`,
            config
          )
          .then((response) => {
            const url = URL.createObjectURL(response.data);
            setAvatarUrl(url);
          })
          .catch((error) => console.error("Error:", error));
      },
      (err) => console.log(err)
    );
  }, [refetch]);

  return (
    <div className="profile" style={{ backgroundColor: "#f1f5f9" }}>
      <Header refetch={refetch} />
      <div className="profile-wrap">
        <div
          className="profile-content col-md-6"
          style={{ backgroundColor: "white" }}
        >
          <Tooltip
            placement={TOOLTIP_POSITION}
            title={"Go back"}
            color={"black"}
          >
            <div
              className="icon-back"
              onClick={() => history.push(ROUTER_CONST.home)}
            >
              <ArrowLeftOutlined
                style={{ fontSize: 20 }}
                className="sidebar-responsive-icon"
              />
            </div>
          </Tooltip>
          <div className="pf-avatar center">
            {avatarUrl ? (
              <div className="avt center avt-wrap">
                {" "}
                <img className="avt" src={avatarUrl} alt="avt" />
              </div>
            ) : (
              <div className="avt center avt-wrap">
                {" "}
                <UserOutlined style={{ fontSize: 150 }} />
              </div>
            )}
            <DialogAvatar setRefetch={setRefetch} />
          </div>

          <div className="pr-info">
            <div className="justifySpaceBetween">
              <span className="mt-2">
                First Name: <b>{userInfo?.firstName}</b>
              </span>
              <span className="mt-2">
                Last Name: <b>{userInfo?.lastName}</b>
              </span>
            </div>
            <div className="justifySpaceBetween">
              <span className="mt-2">
                Email: <b>{userInfo?.email}</b>
              </span>
              <Tooltip
                placement={TOOLTIP_POSITION}
                title={"Change password"}
                color={"black"}
              >
                <EditOutlined
                  style={{ color: "#a3a3a3" }}
                  className="mt-2 change-pass"
                  onClick={() => setIsOpenChangePass(true)}
                />
              </Tooltip>
            </div>

            <div className="pr-btn center ">
              <Button
                className="btn-update"
                onClick={() => setIsOpenUpdateModal(true)}
              >
                Update profile
              </Button>
            </div>
          </div>
        </div>

        <Modal
          title="Update profile"
          visible={isOpenUpdateModal}
          onCancel={() => setIsOpenUpdateModal(false)}
          footer={null}
        >
          <UpdateInfo
            setIsOpenUpdateModal={setIsOpenUpdateModal}
            isOpenUpdateModal={isOpenUpdateModal}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        </Modal>
        <Modal
          title="Change password"
          visible={isOpenChangePass}
          onCancel={() => setIsOpenChangePass(false)}
          footer={null}
        >
          <ChangePassword setIsOpenChangePass={setIsOpenChangePass} />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
