import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const webSearchAPI = createApi({
  reducerPath: 'webSearchAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_NOT_SECRET_CODE);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getWebSearch: builder.query({
      query: (webSearch) =>
        `/Search/WebSearchAPI?q=${webSearch}&autoCorrect=true&pageSize=25`, //get web results
    }),
    getImageSearch: builder.query({
      query: (imageSearch) =>
        `/Search/ImageSearchAPI?q=${imageSearch}&autoCorrect=true&pageSize=50`, //get images results
    }),
    getNewsSearch: builder.query({
      query: (newsSearch) =>
        `/search/NewsSearchAPI?q=${newsSearch}&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null&pageSize=30`, //get news results
    }),
  }),
});

export const {
  useGetWebSearchQuery,
  useGetImageSearchQuery,
  useGetNewsSearchQuery,
} = webSearchAPI;
