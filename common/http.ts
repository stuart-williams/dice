import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
  },
});

/**
 * Fetcher for swr:
 * https://swr.vercel.app/docs/data-fetching#axios
 */
export const fetcher = (url: string) =>
  apiClient.get(url).then(({ data }) => data);
