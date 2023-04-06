import axios from "axios";
import store from "../store";
import ActionTypes from "../store/action-types";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
//call /sanctum/csrf-cookie to get the CSRF token
// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
  // If http method is `post | put | delete` and XSRF-TOKEN cookie is
  // not present, call '/sanctum/csrf-cookie' to set CSRF token, then
  // proceed with the initial response
  if (
    (config.method === "post" ||
      config.method === "put" ||
      config.method === "delete") &&
    /* other methods you want to add here */
    !Cookies.get("XSRF-TOKEN")
  ) {
    return setCSRFToken().then((response) => config);
  }
  return config;
};

const setCSRFToken = () => {
  return http.get("/sanctum/csrf-cookie"); // resolves to '/api/csrf-cookie'.
};

http.interceptors.request.use(onRequest, null);
http.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch({ type: ActionTypes.LOGOUT_USER });
    }
    return Promise.reject(error);
  }
);
export { http };
