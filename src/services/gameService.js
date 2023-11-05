import { postRequest } from "../config/api/apiCaller"
import { ApiUrl } from "../config/api/apiConst"

export const listQuestionRequest = async (params, successCallback, errorCallback) => {
    await postRequest(ApiUrl.getGame, params, successCallback, errorCallback)
}

export const finishGameRequest = async (params, successCallback, errorCallback) => {
    await postRequest(ApiUrl.finishGame, params, successCallback, errorCallback)
}
