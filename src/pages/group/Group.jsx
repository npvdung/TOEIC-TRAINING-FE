import { Button, Input, Modal } from "antd";
import Header from "../home/header/Header";
import "./group.scss";
import {
  createGroup,
  deleteGroup,
  getGroupsByUserId,
  getUsersByGroup,
  joinGroup,
} from "../../services/groupService";
import { getUserInfo } from "../../utils/storage";
import { useEffect, useState } from "react";
import { GroupItem } from "./components/GroupItem";
import { GroupUserModal } from "./components/GroupUsersModal";

export const GroupPage = () => {
  const userInfo = getUserInfo();
  const [newGroupName, setNewGroupName] = useState("");
  const [joinGroupCode, setJoinGroupCode] = useState("");
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const handleCreateGroup = () => {
    createGroup({ name: newGroupName, ownerId: userInfo.id }, () => {
      getGroups();
    });
  };
  const handleJoinGroup = () => {
    joinGroup({ code: joinGroupCode, userId: userInfo.id }, () => {
      getGroups();
    });
  };

  const getUserByGroup = (id) => {
    getUsersByGroup(id, (response) => {
      setUsers(response.data.data);
    });
  };

  const getGroups = () => {
    getGroupsByUserId(userInfo.id, handleGetGroups);
  };

  const handleGetGroups = (response) => {
    setGroups(response.data.data);
  };

  const handleDeleteGroup = (id) => {
    deleteGroup(id, () => {
      getGroups();
    });
  };

  const handleViewGroup = (id) => {
    getUserByGroup(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="group-page">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="group-header">
        <Input
          placeholder="Create group"
          style={{ width: "500px" }}
          onChange={(e) => {
            setNewGroupName(e.target.value);
          }}
        />
        <Button onClick={handleCreateGroup} style={{ width: "100px" }}>
          Add new
        </Button>
      </div>
      <div className="group-header">
        <Input
          placeholder="Join group"
          style={{ width: "500px" }}
          onChange={(e) => {
            setJoinGroupCode(e.target.value);
          }}
        />
        <Button onClick={handleJoinGroup} style={{ width: "100px" }}>
          Join
        </Button>
      </div>
      <div className="group-info">
        <div className="group-info-content">
          <div className="group-title">My groups</div>
          {groups.map((item) => {
            return (
              <GroupItem
                groupId={item.id}
                groupName={item.name}
                groupCode={item.code}
                handleDelete={handleDeleteGroup}
                handleView={handleViewGroup}
                key={item.code}
              />
            );
          })}
        </div>
      </div>
      <GroupUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        users={users}
      />
    </div>
  );
};
