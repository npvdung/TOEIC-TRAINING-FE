import { getRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const getTopRequest = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.getTop, {}, successCallback, errorCallback);
};
