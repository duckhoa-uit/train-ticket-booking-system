import { authenticate, validate } from '@/middleware'
import { Router } from 'express'

import {
  forgotPasswordHandler,
  getAllUserHandler,
  getMeHandler,
  getUserDetailByIdHandler,
  resetForgotPasswordHandler,
  updateUserHandler
} from '@/controllers/user.controller'
import {
  forgotPasswordSchema,
  userGetAllQuery,
  userIdParamsSchema,
  userResetPasswordSchema,
  userUpdateSchema
} from '@/schemas/user.schema'

export const userRouter = Router()

/**
 * @openapi
 * /api/users:
 *  put:
 *    tags:
 *    - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schema/UserResponse"
 *
 */
userRouter.put(
  '/',
  authenticate(), // only authorized users
  validate(userUpdateSchema), // validate request body
  updateUserHandler
)

/**
 * @openapi
 * /api/users/me:
 *  get:
 *    tags:
 *    - User
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schema/ListSchema"
 *              properties:
 *                data:
 *                  $ref: '#/components/schema/UserResponse'
 *
 */
userRouter.get('/me', authenticate(), getMeHandler)

/**
 * @openapi
 * /api/users/forgot-password:
 *  post:
 *    tags:
 *    - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schema/ForgotPasswordInput'
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
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/ErrorSchema'
 *            examples:
 *              User with email ${email} not found:
 *                value:
 *                  status: fail
 *                  message: User with email ${email} not found
 */
userRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPasswordHandler)

/**
 * @openapi
 * /api/users/reset-password:
 *  post:
 *    tags:
 *    - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schema/ResetPasswordInput'
 *    parameters:
 *      - name: token
 *        in: query
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/ListSchema'
 *              properties:
 *                data:
 *                  $ref: '#/components/schema/UserResponse'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schema/ErrorSchema'
 *            examples:
 *              Token ${token} isn't valid.:
 *                value:
 *                  status: error
 *                  message: Token ${token} isn't valid.
 */
userRouter.post('/reset-password', validate(userResetPasswordSchema), resetForgotPasswordHandler)

/**
 * @openapi
 * /api/users:
 *  get:
 *    tags:
 *    - User
 *    parameters:
 *      - $ref: '#/components/parameters/offsetParam'
 *      - $ref: '#/components/parameters/limitParam'
 *      - name: name_search
 *        in: query
 *        type: string
 *      - name: sort_field
 *        in: query
 *        type: string
 *        default: "createdAt"
 *      - name: sort_direction
 *        in: query
 *        type: string
 *        default: "-1"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schema/UserResponse'
 *
 */
userRouter.get(
  '/',
  // authenticate(),
  validate(userGetAllQuery),
  getAllUserHandler
)

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *    tags:
 *    - User
 *    parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schema/UserResponseWithPlan'
 */
userRouter.get('/:id', authenticate(), validate(userIdParamsSchema), getUserDetailByIdHandler)
