import { NextFunction, Request, Response } from "express";

import { AuthorizedRequest } from "@/middleware";
import {
  TokenParamsInput,
  UserForgotPasswordInput,
  UserGetAllQuery,
  UserIdParamsInput,
  UserResetPasswordInput,
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
    const userManagerAndStaff = await UserService.getMe(user.id);

    res.status(200).json({
      status: "success",
      data: userManagerAndStaff ? userManagerAndStaff : user,
    });
  } catch (err) {
    next(err);
  }
};

export const resetForgotPasswordHandler = async (
  req: Request<{}, {}, UserResetPasswordInput, TokenParamsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await resetPassword(req.query.token, req.body.password);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, UserForgotPasswordInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUniqueUser({
      // TODO: update this after init schema
      // emails: {
      //   some: {
      //     address: req.body.email,
      //   },
      // },
    });
    if (!user) {
      return next(new AppError(400, `User with email ${req.body.email} not found`));
    }

    sendForgotPasswordEmail(user, req.body.email);

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
