import { ChakraProvider } from "@chakra-ui/react";
import { apiClient } from "common/http";
import { setLocale } from "lib/dayjs";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import theme from "theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  setLocale(router.locale || "en-GB");

  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            apiClient.get(resource, init).then(({ data }) => data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
