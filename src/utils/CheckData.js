import { getToken } from "./storage";

export const isLogin = () => {
  const token = getToken();
  if (
    token === null ||
    token === undefined ||
    token === "null" ||
    token === "undefined"
  ) {
    return false;
  }
  return true;
};

export const checkDataInLocalStorage = (data) => {
  if (
    data === null ||
    data === undefined ||
    data === "null" ||
    data === "undefined"
  ) {
    return false;
  }
  return true;
};

export const checkArrIncludesQuest = (arr, questId) => {
  if (arr.length === 0) return false;
  let result;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === questId) {
      result = true;
      break;
    } else {
      result = false;
    }
  }
  return result;
};

export const checkTypeData = (data) => {
  if (data.match(".mp3")) {
    return "audio";
  } else if (data.match(".jpg") || data.match(".png") || data.match(".jpeg")) {
    return "image";
  } else if (data.match(".mp4")) {
    return "video";
  } else {
    return "text";
  }
};
