import {
  CreateListenerMiddlewareOptions,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = selectCurrentToken(getState());
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token request");

    //send refresh token request to get new access token
    const refreshTokenResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshTokenResult);

    if (refreshTokenResult.data) {
      const user = api.getState().auth.user;
      //store the new token in the store
      api.dispatch(setCredentials({ ...refreshTokenResult.data, user }));

      //retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
