import { getRequest } from '../config/api/apiCaller'
import { ApiUrl } from '../config/api/apiConst'

export const getHistory = async (userId, successCallback, errorCallback) => {
  await getRequest(
    `${ApiUrl.results}/getByUser/${userId}`,
    {},
    successCallback,
    errorCallback
  )
}

export const getResultDetail = async (
  resultId,
  successCallback,
  errorCallback
) => {
  await getRequest(
    ApiUrl.results + `/${resultId}`,
    {},
    successCallback,
    errorCallback
  )
}

export const getExamDetails = async (
  examId,
  successCallback,
  errorCallback
) => {
  await getRequest(
    ApiUrl.examDetail + `/${examId}`,
    {},
    successCallback,
    errorCallback
  )
}
