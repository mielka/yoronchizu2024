import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { japanchoiceTheme } from "../utils/japanchoiceTheme.mjs";
import { notoSansJP, lato } from "../utils/japanchoiceTheme.mjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={japanchoiceTheme}>
      <div className={`${notoSansJP.className} ${lato.className}`}>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
