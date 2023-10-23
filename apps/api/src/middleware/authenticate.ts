import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

import { findUniqueUser } from '@/services/user.service'
import AppError from '@/utils/app-error'
import { verifyJwt } from '@/utils/jwt'
import redisClient from '@/utils/redis'

export const authenticate = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // extract token from header
    const header = req.header('Authorization')
    if (!header) {
      return next(new AppError(401, 'No authorization header found!'))
    }
    const token = header.replace('Bearer ', '')
    if (!token) {
      return next(new AppError(401, 'Invalid authorization header!'))
    }

    // Validate the access token
    const decoded = verifyJwt<{ sub: string }>(token, 'accessTokenPublicKey')

    if (!decoded) {
      return next(new AppError(401, `Invalid token or session has expired`))
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub)

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`))
    }

    // Check if the user still exist
    const user = (await findUniqueUser({ id: JSON.parse(session).id })) as User

    if (!user) {
      return next(new AppError(401, `Invalid token or user doesn't exist`))
    }

    // attach user to request object
    (req as AuthorizedRequest).user = user

    return next()
  } catch (error) {
    next(error)

    // return res.status(400).json(error);
  }
}

// augment the req object with the request's sender as User
export type AuthorizedRequest = Request & { user: User }
export type GenerateTokenRequest = Request & {refreshToken: string}
