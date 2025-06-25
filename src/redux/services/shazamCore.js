import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "6af1a16360msh0ab9d0547fc7dd1p1dedbajsne3e55f3fee31"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 🌍 Get Global Top Charts
    getTopCharts: builder.query({
      query: () => "/charts/world?country_code=DZ",
    }),

    // 🧑‍🎤 Get Artist Details
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/details?artist_id=${artistId}`,
    }),

    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/genre-world?genre_code=${genre}&country_code=DZ`,
    }),
    getTopArtists: builder.query({
      query: () => "/charts/track",
    }),
  }),
});

// 🔁 Export hooks
export const {
  useGetTopChartsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByGenreQuery, // ← Export this hook
} = shazamCoreApi;
