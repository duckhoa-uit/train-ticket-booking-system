import { Router } from "express";

import {
  getAllUserHandler,
  getMeHandler,
  getUserDetailByIdHandler,
  updateUserHandler,
} from "@/controllers/user.controller";
import { authenticate, validate } from "@/middleware";
import { userGetAllQuery, userIdParamsSchema, userUpdateSchema } from "@/schemas/user.schema";

export const userRouter = Router();

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
  "/",
  authenticate(), // only authorized users
  validate(userUpdateSchema), // validate request body
  updateUserHandler
);

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
userRouter.get("/me", authenticate(), getMeHandler);

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
  "/",
  // authenticate(),
  validate(userGetAllQuery),
  getAllUserHandler
);

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
userRouter.get("/:id", authenticate(), validate(userIdParamsSchema), getUserDetailByIdHandler);
