import { ChakraProvider } from "@chakra-ui/react";
import { apiClient } from "common/http";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
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
