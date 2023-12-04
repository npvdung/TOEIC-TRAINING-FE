import { getRequest, putRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const getAllUsers = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.user, {}, successCallback, errorCallback);
};

export const getUser = async (userId, successCallback, errorCallback) => {
  await getRequest(
    ApiUrl.user + `/${userId}`,
    {},
    successCallback,
    errorCallback
  );
};

export const updateUser = async (params, successCallback, errorCallback) => {
  await putRequest(
    ApiUrl.user + `/${params.userId}`,
    params,
    successCallback,
    errorCallback
  );
};

export const updateRoleActivated = async (
  params,
  successCallback,
  errorCallback
) => {
  await putRequest(
    ApiUrl.user + "/role-activate",
    params,
    successCallback,
    errorCallback
  );
};
