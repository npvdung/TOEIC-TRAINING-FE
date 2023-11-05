import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const fetchQuestions = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.questions, {}, successCallback, errorCallback);
};

export const createQuestion = async (
  params,
  successCallback,
  errorCallback
) => {
  await postRequest(ApiUrl.questions, params, successCallback, errorCallback);
};



export const removeQuestion = async (
  questionId,
  successCallback,
  errorCallback
) => {
  await deleteRequest(
    ApiUrl.questions + `/${questionId}`,
    {},
    successCallback,
    errorCallback
  );
};

export const editQuestion = async (
  params,
  successCallback,
  errorCallback
) => {
  await putRequest(
    ApiUrl.questions + `/${params.id}`,
    params,
    successCallback,
    errorCallback
  );
};
