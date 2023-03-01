import "@/styles/globals.css";
import "@/styles/Navbar.css";
import "@/styles/Resources.css";
import "@/styles/Feed.css";
import "@/styles/Sem.css";
import "@/styles/Login.css";
import type { AppProps } from "next/app";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const supportedChainIds = [4];
  const connectors = {
    injected: {},
  };
  return (
    <>
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <ChakraProvider cssVarsRoot={undefined}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebWeb3Provider>
    </>
  );
}
