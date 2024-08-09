"use client"
import { TurnkeyProvider } from "@turnkey/sdk-react";
import TurnkeyContextProvider from './turnkeyContext';
import WalletContextProvider from './walletContext';

const turnkeyConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_TURNKEY_API_BASE_URL!,
    defaultOrganizationId: process.env.NEXT_PUBLIC_ORGANIZATION_ID!,
    rpId: process.env.NEXT_PUBLIC_RPID!,
    serverSignUrl: process.env.NEXT_PUBLIC_SERVER_SIGN_URL!,
    iframeUrl: process.env.NEXT_PUBLIC_IFRAME_URL ?? "https://auth.turnkey.com",
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WalletContextProvider>
        <TurnkeyProvider config={turnkeyConfig}>
            <TurnkeyContextProvider>
            {children}
            </TurnkeyContextProvider>
        </TurnkeyProvider>
        </WalletContextProvider>
    );
}

export default AppProvider;