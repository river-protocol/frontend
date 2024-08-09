import { TurnkeySigner } from "@turnkey/ethers";
import  {ethers, BrowserProvider, Signer } from "ethers";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type StoreState = {
    signer: Signer | TurnkeySigner | null;
    balance: string;
    setSigner: Dispatch<SetStateAction<StoreState["signer"]>>;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
};
  
const WalletContext = createContext<StoreState>({
    signer: null,
    balance: "0",
    setSigner: () => {},
    connectWallet: async () => {},
    disconnectWallet: () => {},
});
  
export const useWalletContext = () => useContext(WalletContext);
  
type Props = {
    children?: React.ReactNode;
};

const WalletContextProvider = (props: Props) => {
    const [signer, setSigner] = useState<StoreState["signer"]>(null)
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [balance, setBalance] = useState<string>("0");

    useEffect(() => {
        if (window.ethereum) {
          const providerInstance = new ethers.BrowserProvider(window.ethereum);
          setProvider(providerInstance);
      
          window.ethereum.on("accountsChanged", handleAccountsChanged);
          window.ethereum.on("chainChanged", () => window.location.reload());
      
          fetchInitialAccounts(providerInstance);
        }
      }, []);

      
      useEffect(() => {
        let interval: any;
        if (signer) {
          const getBalance = async () => {
            setBalance(ethers.formatEther(await signer.provider?.getBalance(await signer.getAddress())!)?.toString()!)
          }
          getBalance()
          interval = setInterval(getBalance, 30000)
        }
        return () => clearInterval(interval)
      }, [signer])
      
      const handleAccountsChanged = async (accounts: string[]) => {
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);
        if (accounts.length > 0) {
          setSigner(await providerInstance.getSigner());
        } else {
          resetConnection();
        }
      };
      
      const fetchInitialAccounts = async (providerInstance: BrowserProvider) => {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setSigner(await providerInstance.getSigner());
          }
        } catch (error) {
          console.error("Unable to fetch accounts:", error);
        }
      };
      
      const connectWallet = async () => {
        if (!window.ethereum) {
          window.open("https://metamask.io/download.html", "_blank");
          return;
        }
      
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setSigner(await provider!.getSigner());
          await ensureCorrectNetwork();
        } catch (error) {
          console.error("Wallet connection failed:", error);
        }
      };
      
      const disconnectWallet = () => {
        resetConnection();
      };
      
      const resetConnection = () => {
        setSigner(null);
      };
      
      const ensureCorrectNetwork = async () => {
        const desiredChainId = "0x6CC";
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: desiredChainId }],
          });
        } catch (error: any) {
          if (error.code === 4902) {
            await addNetwork(desiredChainId);
          } else {
            console.error("Network switch failed:", error);
          }
        }
      };
      
      const addNetwork = async (chainId: string) => {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                chainName: "Theta Testnet",
                rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
                nativeCurrency: {
                  name: "TFUEL",
                  symbol: "TFUEL",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet-explorer.thetatoken.org/"],
              },
            ],
          });
        } catch (error) {
          console.error("Failed to add network:", error);
        }
      };
            
    return (
        <WalletContext.Provider value={{ balance, signer, setSigner, connectWallet, disconnectWallet }}>
            {props.children}
        </WalletContext.Provider>
    )
}

export default WalletContextProvider