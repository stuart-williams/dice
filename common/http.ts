import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
  },
});

export const fetcher = (url: string) =>
  apiClient.get(url).then(({ data }) => data);
