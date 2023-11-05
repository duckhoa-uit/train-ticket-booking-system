import config from "config";
import crypto from "crypto";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import { env } from "@ttbs/env";
import { Prisma, User } from "@ttbs/prisma/client";

import { AuthorizedRequest } from "@/middleware";
import { RefreshTokenSchema, UserLoginInput } from "@/schemas/auth.schema";
import { UserCreateInput } from "@/schemas/user.schema";
import { comparePasswords, logout, signTokens } from "@/services/auth.service";
import { createUser, findUniqueUser } from "@/services/user.service";
import AppError from "@/utils/app-error";
import { signJwt, verifyJwt } from "@/utils/jwt";
import redisClient from "@/utils/redis";

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
};

if (env.NODE_ENV === "production") cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.get<number>("auth.accessTokenExpiresIn") * 60 * 1000),
  maxAge: config.get<number>("auth.accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + config.get<number>("auth.refreshTokenExpiresIn") * 60 * 1000),
  maxAge: config.get<number>("auth.refreshTokenExpiresIn") * 60 * 1000,
};

// TODO: need to update
export const excludedFields = ["services", "verificationCode"] as const;

export const loginUserHandler = async (
  req: Request<{}, {}, UserLoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    let user: User | null = null;
    if (email) {
      user = await findUniqueUser({
        // TODO: update this after init schema
        // emails: {
        //   some: {
        //     address: email,
        //   },
        // },
      });
    }

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    // TODO: update this after init schema
    if (!(await comparePasswords(password, "user.services.password?.bcrypt" ?? ""))) {
      return next(new AppError(401, "Password is not correct"));
    }

    // TODO: update this after init schema
    // eslint-disable-next-line no-constant-condition
    if ("user.emails[0].verified") {
      return next(new AppError(403, "E-mail address not verified."));
    }

    // TODO: add ip to profile.location
    // const { user: { _id, profile }, connection: { clientAddress } } = raw;
    // if (R.path(['location', 'ip'], profile) !== clientAddress) {
    //   Meteor.users.update({ _id }, { $set: { 'profile.location.ip': clientAddress } });
    // }

    // Sign Tokens
    const { access_token, refresh_token } = signTokens(user);
    // TODO: do we need cookies?
    // res.cookie('access_token', access_token, accessTokenCookieOptions);
    // res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    // res.cookie('logged_in', true, {
    //   ...accessTokenCookieOptions,
    //   httpOnly: false,
    // });

    res.status(200).json({
      status: "success",
      data: {
        access_token,
        refresh_token,
      },
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
  try {
    const foundUser = await findUniqueUser({
      // TODO: update this after init schema
      // emails: {
      //   some: {
      //     address: req.body.email,
      //   },
      // },
    });
    if (foundUser) {
      throw new AppError(409, "Email already exist, please use another email address");
    }

    if (req.body.password.length < 8) {
      throw new AppError(400, "Password must be at least 8 characters in length");
    }

    // TODO: verification code
    const verifyCode = crypto.randomBytes(32).toString("hex");
    const verificationCode = crypto.createHash("sha256").update(verifyCode).digest("hex");

    const user = await createUser(req.body);

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
