import { authenticate, validate } from '@/middleware'
import { Router } from 'express'

import {
  loginUserHandler,
  logoutUserHandler,
  refreshToken,
  registerUserHandler,
} from '@/controllers/auth.controller'
import { loginSchema } from '@/schemas/auth.schema'
import { userCreateSchema } from '@/schemas/user.schema'

export const authRouter = Router()

/**
 *
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserLoginInput"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserLoginResponse"
 *       400:
 *         description: Bad request
 *
 *       401:
 *         description: Password is not correct
 *       404:
 *         description: User not found
 */

authRouter.post('/login', validate(loginSchema), loginUserHandler)

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *    tags:
 *      - Authentication
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schema/CreateUserInput'
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schema/ListSchema"
 *              properties:
 *                data:
 *                  $ref: '#/components/schema/UserResponse'
 *
 *      409:
 *        description: Conflict.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/ErrorSchema'
 *            examples:
 *              Email already exist, please use another email address:
 *                value:
 *                  status: fail
 *                  message: Email already exist, please use another email address
 */
authRouter.post('/register', validate(userCreateSchema), registerUserHandler)

/**
 * @openapi
 * /api/auth/logout:
 *  get:
 *    tags:
 *      - Authentication
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  default: success
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/ErrorSchema'
 *            examples:
 *              No authorization header found!:
 *                value:
 *                  status: fail
 *                  message: No authorization header found!
 */
authRouter.get('/logout', authenticate(), logoutUserHandler)

/**
 *
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RefreshTokenSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserRefreshTokenResponse"
 *       403:
 *         description: Could not refresh access token
 */
authRouter.post('/refresh', refreshToken)
