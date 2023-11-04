import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "554c73a57emshe03124f2d676351p1edce4jsn4aa7d0fb189a",
    "X-RapidAPI-Host": "",
  },
};

fetch("https://shazam-core.p.rapidapi.com/v1/charts/genre-world", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
});
