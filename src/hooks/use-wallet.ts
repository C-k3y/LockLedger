import { useState, useCallback } from "react";

interface WalletState {
  connected: boolean;
  address: string | null;
  network: string;
  connecting: boolean;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    network: "Polygon",
    connecting: false,
  });

  const connect = useCallback(async (provider: string) => {
    setWallet((prev) => ({ ...prev, connecting: true }));
    // Simulate connection delay
    await new Promise((r) => setTimeout(r, 1500));
    setWallet({
      connected: true,
      address: "0x7890...1234",
      network: "Polygon",
      connecting: false,
    });
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ connected: false, address: null, network: "Polygon", connecting: false });
  }, []);

  const switchNetwork = useCallback((network: string) => {
    setWallet((prev) => ({ ...prev, network }));
  }, []);

  return { ...wallet, connect, disconnect, switchNetwork };
}
