// here we have all the endpoints related to the user to send to the backend

import { apiSlice } from "./apiSlice";

// could be stored in utils file
const USERS_URL = "/api/users";

// create our endpoints here and enject them in the apiSlice
// endpoints: (builder) => ({}),
// use dependency injection to inject the endpoints

export const usersApiSlice = apiSlice.injectEndpoints({
  // here we put our queries and mutations
  endpoints: (builder) => ({
    // for example in the login page we need to dispatch this login action
    login: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// it's a convention
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = usersApiSlice;
