import { User } from "@prisma/client";
import config from "config";
import { Response } from "express";

import { signJwt } from "@/utils/jwt";
import redisClient from "@/utils/redis";

export const signTokens = (user: User) => {
  // 1. Create Session
  redisClient.set(`${user.id}`, JSON.stringify(user), {
    EX: config.get<number>("redisCacheExpiresIn") * 60 * 24,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("auth.accessTokenExpiresIn")}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<number>("auth.refreshTokenExpiresIn")}m`,
  });

  return { access_token, refresh_token };
};

export function logout(res: Response) {
  res.cookie("access_token", "", { maxAge: -1 });
  res.cookie("refresh_token", "", { maxAge: -1 });
  res.cookie("logged_in", "", { maxAge: -1 });
}
