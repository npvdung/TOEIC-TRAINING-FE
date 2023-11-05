import axios from "axios";
import { getToken } from "../../utils/storage";

axios.interceptors.request.use((config) => {
  const token = getToken();
  const tokenType = "Bearer";
  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "*";
  config.headers["Access-Control-Max-Age"] = 3600;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      const originalReq = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        //requestNewToken();
      }
      return reject(error);
    });
  }
);

export const getRequest = (
  url = "",
  params,
  successCallback,
  errorCallback,
  timeout
) => {
  return axios
    .get(url, params, { timeout })
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const postRequest = async (
  url = "",
  params,
  successCallback,
  errorCallback
) => {
  return await axios
    .post(url, params)
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log("error", error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const putRequest = (
  url = "",
  params = {},
  successCallback,
  errorCallback,
  headers = {},
  timeout
) => {
  return axios
    .put(url, params, {
      headers,
      timeout,
    })
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const deleteRequest = (
  url = "",
  params = {},
  successCallback,
  errorCallback,
  headers = {},
  timeout
) => {
  return axios
    .delete(url, params, {
      headers,
      timeout,
    })
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

// const requestNewToken = () => {
//   const refreshToken = getRefreshToken();

//   if (!refreshToken) {
//     alert("login again");
//     window.location.href("/login");
//   }

//   const res = fetch(`api?refresh-token=${refreshToken}`, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "*/*",
//       "Accept-Encoding": "gzip, deflate, br",
//       Connection: "keep-alive",
//     },
//     redirect: "follow",
//     referrer: "no-referrer",
//   })
//     .then((res1) => res1.json())
//     .then((res2) => {
//       if (res2.access_token) {
//         try {
//           setToken(res2.access_token);
//           setRefeshToken(res2.refresh_token);
//         } catch (error) {
//           alert("login again");
//           window.location.href("/login");
//         }
//       } else {
//         window.location.href("/login");
//       }
//     });

//   return res;
// };
