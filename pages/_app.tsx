import { ChakraProvider } from "@chakra-ui/react";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { nftoursTheme } from "../styles/nftoursTheme";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { AppProvider } from "../context/AppContext";
import { InjectedConnector } from "wagmi/connectors/injected";
import { SessionProvider } from "next-auth/react";
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY || "" }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: any) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <AppProvider>
          <ChakraProvider theme={nftoursTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </AppProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
