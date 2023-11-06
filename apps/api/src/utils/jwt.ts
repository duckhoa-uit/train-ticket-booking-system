import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "@ttbs/env";

const privateKeys = {
  accessTokenPrivateKey: env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
} as const;
type PrivateKey = keyof typeof privateKeys;

export const signJwt = (payload: Object, keyName: PrivateKey, options: SignOptions) => {
  const privateKey = Buffer.from(privateKeys[keyName], "base64").toString("ascii");

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    allowInsecureKeySizes: true,
    algorithm: "RS256",
  });
};

const publicKeys = {
  accessTokenPublicKey: env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPublicKey: env.JWT_REFRESH_TOKEN_PUBLIC_KEY,
} as const;
type PublicKey = keyof typeof publicKeys;
export const verifyJwt = <T>(token: string, keyName: PublicKey): T | null => {
  try {
    const publicKey = Buffer.from(publicKeys[keyName], "base64").toString("ascii");
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
