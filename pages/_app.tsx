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
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const supportedChainIds = [4];
  const connectors = {
    injected: {},
  };
  return (
    <>
      <SessionProvider session={session}>
        <ChakraProvider cssVarsRoot={undefined}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
