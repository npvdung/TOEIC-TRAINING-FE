import { deleteRequest, getRequest, postRequest, putRequest } from '../config/api/apiCaller'
import { ApiUrl } from '../config/api/apiConst'

export const fetchReadingQuestions = async (successCallback, errorCallback) => {
  await getRequest(
    ApiUrl.questions + '/reading',
    {},
    successCallback,
    errorCallback
  )
}

export const createReadingQuestion = async (
  params,
  successCallback,
  errorCallback
) => {
  await postRequest(ApiUrl.reading, params, successCallback, errorCallback)
}

export const updateReadingQuestion = async (
  params,
  successCallback,
  errorCallback
) => {
  await putRequest(ApiUrl.reading, params, successCallback, errorCallback)
}

export const removeReadingQuestion = async (
  readingId,
  successCallback,
  errorCallback
) => {
  await deleteRequest(
    ApiUrl.reading + `/${readingId}`,
    {},
    successCallback,
    errorCallback
  )
}
