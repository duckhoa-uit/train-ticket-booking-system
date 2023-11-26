import config from "config";
// import crypto from "crypto";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import { env } from "@ttbs/env";
import { comparePasswords } from "@ttbs/lib/password";
import { Prisma } from "@ttbs/prisma";

import { AuthorizedRequest } from "@/middleware";
import {
  LoginCallbackInput,
  RefreshTokenSchema,
  UserLoginInput,
  loginCallbackSchema,
  loginSchema,
} from "@/schemas/auth.schema";
import { UserCreateInput, userCreateSchema } from "@/schemas/user.schema";
import { logout, signTokens } from "@/services/auth.service";
import { createUser, findUniqueUser, updateUserLoginCallback } from "@/services/user.service";
import AppError from "@/utils/app-error";
import { signJwt, verifyJwt } from "@/utils/jwt";
import redisClient from "@/utils/redis";

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (env.NODE_ENV === "production") cookiesOptions.secure = true;

// TODO: need to update
export const excludedFields = ["services", "verificationCode"] as const;

export const loginUserHandler = async (
  req: Request<{}, {}, UserLoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { email, password },
    } = loginSchema.parse(req);

    const user = await findUniqueUser({ email: email.toLowerCase() });

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    if (!(await comparePasswords(password, user.password ?? ""))) {
      return next(new AppError(401, "Password is not correct"));
    }

    // Sign Tokens
    const { access_token, refresh_token } = signTokens(user);

    res.status(200).json({
      status: "success",
      data: {
        access_token,
        refresh_token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const loginCallbackHandler = async (
  req: Request<{}, {}, LoginCallbackInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = loginCallbackSchema.parse(req);

    const response = await updateUserLoginCallback(body);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUserHandler = async (
  req: Request<{}, {}, UserCreateInput>,
  res: Response,
  next: NextFunction
) => {
  const { body: reqBody } = userCreateSchema.parse(req);
  const { email } = reqBody;

  try {
    const foundUser = await findUniqueUser({
      email,
    });
    if (foundUser) {
      throw new AppError(409, "Email already exist, please use another email address");
    }

    const user = await createUser(reqBody);

    /**
     * TODO: support sendVerificationEmail + sendEnrollmentEmail
     * Ref: https://github.com/meteor/meteor/blob/devel/packages/accounts-password/password_server.js#L1004
     * */
    // sendVerificationEmail(user.id, req.body.email.toLowerCase());

    const newUser = omit(user, excludedFields);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    // Ref: https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.status(409).json({
          status: "fail",
          message: "Email already exist, please use another email address",
        });
        return;
      }
    }
    next(err);
  }
};

export const logoutUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as AuthorizedRequest).user;

  try {
    await redisClient.del(user.id);
    logout(res);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request<{}, {}, RefreshTokenSchema>,
  res: Response,
  next: NextFunction
) => {
  const message = "Could not refresh access token";
  try {
    const { refreshToken } = req.body;

    const decoded = verifyJwt<{ sub: string; exp: number }>(refreshToken, "refreshTokenPublicKey");
    if (!decoded) {
      res.status(403).json({
        status: "fail",
        message,
      });

      return;
    }

    if (decoded.exp * 1000 < new Date().getTime()) {
      res.status(400).json({
        status: "fail",
        message: "Invalid or token has expired",
      });

      return;
    }

    const session = await redisClient.get(decoded.sub);
    if (!session) {
      res.status(403).json({
        status: "fail",
        message,
      });

      return;
    }

    const user = await findUniqueUser({ id: JSON.parse(session).id });
    if (!user) {
      res.status(403).json({
        status: "fail",
        message,
      });

      return;
    }

    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", {
      expiresIn: `${config.get<number>("auth.accessTokenExpiresIn")}m`,
    });

    res.status(200).json({
      status: "success",
      data: {
        access_token,
      },
    });
  } catch (err) {
    next(err);
  }
};
