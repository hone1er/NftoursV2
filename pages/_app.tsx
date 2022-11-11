import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { nftoursTheme } from "../styles/nftoursTheme";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { AppProvider } from "../context/AppContext";

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider(),
  ]
);
const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <AppProvider>
        <ChakraProvider theme={nftoursTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </WagmiConfig>
  );
}

export default MyApp;
