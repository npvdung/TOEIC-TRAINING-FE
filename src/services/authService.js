import { postRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const loginRequest = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.login, params, successCallback, errorCallback);
};

export const registerRequest = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.register, params, successCallback, errorCallback);
};
