import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../config/api/apiCaller";

import { ApiUrl } from "../config/api/apiConst";

export const createGroup = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.group, params, successCallback, errorCallback);
};

export const joinGroup = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.joinGroup, params, successCallback, errorCallback);
};

export const getGroupsByUserId = async (
  userId,
  successCallback,
  errorCallback
) => {
  await getRequest(
    ApiUrl.user + `/${userId}/groups`,
    {},
    successCallback,
    errorCallback
  );
};

export const deleteGroup = async (id, successCallback, errorCallback) => {
  await deleteRequest(
    ApiUrl.group + `/${id}`,
    {},
    successCallback,
    errorCallback
  );
};

export const getUsersByGroup = async (id, successCallback, errorCallback) => {
  await getRequest(
    ApiUrl.group + `/${id}/users`,
    {},
    successCallback,
    errorCallback
  );
};
