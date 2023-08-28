import { Magic } from "magic-sdk";

const createMagic = (key) => {
  if (typeof window !== "undefined") {
    return new Magic(key, {
      network: "mainnet",
    });
  }
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
