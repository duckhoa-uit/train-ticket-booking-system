import { NextFunction, Request, Response } from "express";

import { AuthorizedRequest } from "@/middleware";
import {
  ResetPasswordQueryParams,
  UserForgotPasswordInput,
  UserGetAllQuery,
  UserIdParamsInput,
  UserResetPasswordInput,
  forgotPasswordSchema,
} from "@/schemas/user.schema";
import * as UserService from "@/services/user.service";
import { findUniqueUser, resetPassword, sendForgotPasswordEmail } from "@/services/user.service";
import AppError from "@/utils/app-error";

export const updateUserHandler = async (req: Request, res: Response) => {
  const user = (req as AuthorizedRequest).user;
  const result = await UserService.updateUser(user.id, req.body);

  return res.status(200).send(result);
};

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as AuthorizedRequest).user;
    const userDb = await UserService.getMe(user.id);
    console.log("🚀 ~ file: user.controller.ts:29 ~ getMeHandler ~ userDb:", userDb);

    res.status(200).json({
      status: "success",
      data: userDb ?? user,
    });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordHandler = async (
  req: Request<{}, {}, UserResetPasswordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId, password } = req.body;

    await resetPassword(requestId, password);
    await UserService.expireResetPasswordRequest(requestId);

    res.status(201).json({ status: "success", data: "Password reset." });
  } catch (err) {
    next(err);
  }
};
export const checkResetPasswordHandler = async (
  req: Request<{}, {}, {}, ResetPasswordQueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const valid = await UserService.checkResetPasswordRequest(req.query.requestId);

    res.status(201).json({ status: "success", data: !!valid });
  } catch (err) {
    next(err);
  }
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, UserForgotPasswordInput>,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email },
  } = forgotPasswordSchema.parse(req);

  try {
    const user = await findUniqueUser({
      email,
    });

    if (!user) {
      return next(new AppError(400, `User with email ${email} not found`));
    }

    await sendForgotPasswordEmail(user);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUserHandler = async (
  req: Request<{}, {}, {}, UserGetAllQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    //sort by point,
    // total in return value
    // const result = await UserService.getAllCustomer(req.query)
    // const total = await UserService.getAllCustomerCount(req.query)

    // return res.status(200).json({
    //   status: 'success',
    //   data: {
    //     total: total,
    //     users: result,
    //   },
    // })

    return res.status(200).json({});
  } catch (error) {
    return next(error);
  }
};

export const getUserDetailByIdHandler = async (
  req: Request<UserIdParamsInput, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // const result = await UserService.getCustomerById(id)
    const result = null;
    if (!result) {
      return next(new AppError(404, `Not found customer with id=${id}`));
    }
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
