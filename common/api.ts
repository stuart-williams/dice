import axios, { AxiosInstance } from "axios";
import { errorLogger, responseLogger, setGlobalConfig } from "axios-logger";
import { logError, logInfo } from "common/logger";

setGlobalConfig({
  data: false,
  params: true,
  status: true,
  logger: logInfo,
  prefixText: false,
  dateFormat: false,
  statusText: false,
});

const withLogging = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.response.use(responseLogger, (error) =>
    errorLogger(error, {
      logger: logError,
    })
  );

  return instance;
};

export const eventsClient = withLogging(
  axios.create({
    baseURL: process.env.EVENTS_API_URL,
    headers: {
      "x-api-key": process.env.API_KEY as string,
    },
  })
);
