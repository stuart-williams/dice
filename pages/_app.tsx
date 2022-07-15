import { ChakraProvider } from "@chakra-ui/react";
import { apiClient } from "common/http";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { setLocale } from "lib/dayjs";
import type { AppProps } from "next/app";
import "styles/global.css";
import theme from "styles/theme";
import { SWRConfig } from "swr";

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
