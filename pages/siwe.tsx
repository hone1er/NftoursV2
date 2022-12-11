import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";

function Siwe() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: connectData, connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();
  console.log(
    "🚀 ~ file: siwe.tsx:16 ~ Siwe ~ session, status",
    session,
    status
  );

  const handleLogin = async () => {
    try {
      await connect(connectData);
      const callbackUrl = "/dashboard";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error: any) {
      window.alert(error);
    }
  };

  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!isConnected) {
          connect();
        } else {
          handleLogin();
        }
      }}
    >
      Sign-in
    </button>
  );
}

export default Siwe;
