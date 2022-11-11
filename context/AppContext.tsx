import { createContext, useContext } from "react";
import { useAccount, useEnsName, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "@wagmi/core";
import { useRouter } from "next/router";
const AppContext = createContext<any>({});

export const AppProvider = ({ children }: any): JSX.Element => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <AppContext.Provider
      value={{
        address,
        isConnected,
        ensName,
        connect,
        disconnect,
        router,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useUser must be used with UserContext");
  }
  return context;
};

export default useAppContext;
