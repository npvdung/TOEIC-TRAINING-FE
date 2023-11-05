import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../config/api/apiCaller'
import { ApiUrl } from '../config/api/apiConst'

export const getExamListByCategory = async (
  categoryId,
  successCallback,
  errorCallback
) => {
  await getRequest(
    ApiUrl.exam + `/getListExamByCategory/${categoryId}`,
    {},
    successCallback,
    errorCallback
  )
}

export const getExamList = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.exam, {}, successCallback, errorCallback)
}

export const createExam = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.exam, params, successCallback, errorCallback)
}

export const removeExam = async (examId, successCallback, errorCallback) => {
  await deleteRequest(
    ApiUrl.exam + `/${examId}`,
    {},
    successCallback,
    errorCallback
  )
}

export const updateExam = async (params, successCallback, errorCallback) => {
  await putRequest(
    ApiUrl.exam + `/${params.examId}`,
    params,
    successCallback,
    errorCallback
  )
}

export const generateRandomExam = async (
  params,
  successCallback,
  errorCallback
) => {
  await postRequest(
    ApiUrl.exam + '/generate-random-exam',
    params,
    successCallback,
    errorCallback
  )
}
