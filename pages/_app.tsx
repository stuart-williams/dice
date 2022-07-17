import { ChakraProvider } from "@chakra-ui/react";
import { setLocale } from "lib/dayjs";
import type { AppProps } from "next/app";
import theme from "theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  setLocale(router.locale || "en-GB");

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
