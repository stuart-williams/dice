import axios from "axios";

export const eventsClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
  },
});
