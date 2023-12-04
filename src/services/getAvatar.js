import { getToken, getUserInfo } from "../utils/storage";
import axios from "axios";
import { getUser } from "./userService";

export const getAvatar = (userId) => {
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
      return url;
    })
    .catch((error) => console.error("Error:", error));
};
