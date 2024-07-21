import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" /* as we use the proxy */ });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"], // for caching under specific tags
  endpoints: (builder) => ({}),
});
