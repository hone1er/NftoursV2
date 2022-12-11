import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";


export const handleLogin = async ({
  connect,
  connectData,
  accountData,
  networkData,
  signMessageAsync,
  toast,
}: any) => {
  try {
    await connect(connectData);
    const callbackUrl = "/dashboard";
    const message = new SiweMessage({
      domain: window.location.host,
      address: accountData,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId: networkData?.id,
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
    toast({
      title: "Error",
      status: "error",
      duration: 9000,
      
    });

    return error;
  }
};