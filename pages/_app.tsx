import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  // const Layout = Component.layout || (({ children }: any) => <>{children}</>);

  return (
    <ChakraProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>Blog</title>
      </Head>
      <div>
        <NextNProgress
          color="#ED8936"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
