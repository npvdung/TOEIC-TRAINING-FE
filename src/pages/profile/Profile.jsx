import React, { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { getUserInfo } from "../../utils/storage";
import Header from "../home/header/Header";
import "./style.scss";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import DialogAvatar from "./DialogAvatar";

import { ROUTER_CONST } from "../../config/paramsConst/RouterConst";
import { useHistory } from "react-router-dom";
import { TOOLTIP_POSITION } from "../../constants/dashboardConstants";

const Profile = () => {
  const user = getUserInfo();
  const history = useHistory();
  const [refetch, setRefetch] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    getUser(
      user.id,
      (res) => {
        setUserInfo(res.data.data);
        setAvatar(res.data.data.avatar);
      },
      (err) => console.log(err)
    );
    // eslint-disable-next-line
  }, []);

  // const handleUpdateInfo = () => {
  //   if (avatar !== userInfo.avatar) {
  //     updateUser(
  //       { avatar: avatar, userId: user.id },
  //       (res) => {
  //         console.log(res);
  //         setRefetch(Date.now());
  //         notificationSuccess("Update success");
  //       },
  //       (err) => console.log(err)
  //     );
  //   } else {
  //     notificationWarning("Please update info");
  //   }
  // };
  return (
    <div className="profile">
      <Header refetch={refetch} />
      <div className="profile-wrap">
        <div className="profile-content col-md-6">
          <Tooltip
            placement={TOOLTIP_POSITION}
            title={"Go back"}
            color={"white"}
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
            {avatar ? (
              <div className="avt center avt-wrap">
                {" "}
                <img className="avt" src={avatar} alt="avt" />
              </div>
            ) : (
              <div className="avt center avt-wrap">
                {" "}
                <UserOutlined style={{ fontSize: 150 }} />
              </div>
            )}
            <DialogAvatar
              setRefetch={setRefetch}
              getValue={(avt) => setAvatar(avt)}
            />
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

            <p className="mt-2">
              Email: <b>{userInfo?.email}</b>
            </p>
          </div>

          {/* <div className="pr-btn center">
            <Button onClick={handleUpdateInfo}>Update</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
