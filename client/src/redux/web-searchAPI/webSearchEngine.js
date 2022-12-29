import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const webSearchAPI = createApi({
  reducerPath: 'webSearchAPI',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '5182c80c07msh3ce47e09668b663p185783jsna3d724138b4b'
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getWebSearch: builder.query({
      query: (webSearch) =>
        `/WebSearchAPI?q=${webSearch}&autoCorrect=true&pageSize=20`, //get web results
    }),
    getImageSearch: builder.query({
      query: (imageSearch) =>
        `/ImageSearchAPI?q=${imageSearch}&autoCorrect=true&pageSize=20`, //get images results
    }),
    getNewsSearch: builder.query({
      query: (newsSearch) =>
        `/NewsSearchAPI?q=${newsSearch}&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null&pageSize=20`, //get news results
    }),
  }),
});

export const {
  useGetWebSearchQuery,
  useGetImageSearchQuery,
  useGetNewsSearchQuery,
} = webSearchAPI;
