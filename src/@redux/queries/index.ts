import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Events } from "types";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_baseUrl }),
  endpoints: builder => ({
    getEventsById: builder.query<Events, string>({
      query: id => `${id}`,
      transformResponse: (response: Events) => response?.sort((prev, curr) => prev?.timestamp - curr?.timestamp),
    }),
  }),
});

export const { useGetEventsByIdQuery } = eventsApi;
