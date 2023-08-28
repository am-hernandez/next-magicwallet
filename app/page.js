"use client";
import { magic } from "@/lib/magic";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [wallet, setWallet] = useState();

  const handleGetInfo = useCallback(async () => {
    try {
      const wallet = await magic.user.getInfo();
      setWallet(wallet);
    } catch (err) {
      console.log("Error Retrieving Wallet Info:", err);
    }
  }, []);

  useEffect(() => {
    handleGetInfo();
  }, [handleGetInfo]);

  const handleConnect = async () => {
    try {
      const address = await magic.wallet.connectWithUI();
      console.log("wallet address:", address);
      await handleGetInfo();
    } catch (err) {
      console.log("Connect Error:", err);
    }
  };

  const handleShowUI = async () => {
    try {
      const walletUIClosed = await magic.wallet.showUI();
      console.log("walletUIClosed:", walletUIClosed);
    } catch (err) {
      console.log("Show UI Error:", err);
    }
  };
  const handleDisconnect = async () => {
    try {
      const disconnected = await magic.wallet.disconnect();
      setWallet();
      console.log("disconnected:", disconnected);
    } catch (err) {
      console.log("Disconnect Error:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      {wallet ? (
        <>
          <button
            onClick={handleShowUI}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Open Wallet
          </button>

          <button
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Connect
        </button>
      )}
    </main>
  );
}
