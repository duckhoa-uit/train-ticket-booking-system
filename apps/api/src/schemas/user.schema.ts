import { ParsedQs } from "qs";
import { z } from "zod";

import { UserRole } from "@ttbs/prisma";

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        activity:
 *            type: array
 *            items:
 *              types: object
 *              properties:
 *                details:
 *                   type: string
 *                event:
 *                   type: string
 *                time:
 *                  type: date-time
 *        bookmarks:
 *            type: array
 *            items:
 *              types: object
 *              properties:
 *                listingId:
 *                   type: string
 *                time:
 *                  type: date-time
 *        emails:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *              verified:
 *                type: bool
 *
 *
 */

export const userCreateSchema = z.object({
  body: z.object({
    name: z.string().min(5).max(256).optional(),
    username: z.string().min(5).max(50),
    password: z.string().min(8).max(50),
    email: z.string().email(),
    role: z.nativeEnum(UserRole).optional(),
    merchantId: z.string().optional().nullable(),
    listingId: z.string().optional().nullable(),
  }),
});

export const userUpdateSchema = z.object({
  body: z.object({
    username: z.string().min(5).max(50).optional(),
    password: z.string().min(8).max(50).optional(),
    email: z.string().email().optional(),
  }),
});

export const userIdParamsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
export const userPhoneParamsSchema = z.object({
  params: z.object({
    phone: z.string(),
  }),
});
export const userEmailParamsSchema = z.object({
  params: z.object({
    email: z.string(),
  }),
});

export const tokenParamsSchema = z.object({
  query: z.object({
    token: z.string(),
  }),
});

export const userFilterParam = userCreateSchema.shape.body.pick({}).extend({
  // start_date: z.coerce.date(),
  // end_date: z.coerce.date(),
  name_search: z.string().optional(),
  sort_field: z.string().optional(),
  sort_direction: z.string().optional(),
});
export type userFilterSchema = z.infer<typeof userFilterParam>;

export const userGetAllQuery = z.object({
  query: z
    .object({
      offset: z.coerce.number(),
      limit: z.coerce.number(),
    })
    .extend(userFilterParam.shape),
});

export const userResetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(50),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().min(5).max(50),
    phone: z.string().min(5).max(50).optional(),
    extraTokenData: z.any().optional(),
  }),
});

export const userRewardIdBodyInputSchema = z.object({
  body: z.object({
    rewardId: z.string(),
  }),
});

export const userPaymentConfirmBodyInputSchema = z.object({
  body: z.object({
    cardDetails: z.object({
      cardNumber: z.string(),
      expire: z.string(),
      cvc: z.string(),
      postalCode: z.string(),
    }),
    memberDetails: z
      .object({
        name: z.string().optional(),
        birthDate: z.date().optional(),
        phoneNumber: z.string().optional(),
        email: z.string().email().optional(),
      })
      .optional(),
    address: z
      .object({
        postalCode: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        street: z.string().optional(),
        state: z.string().optional(),
      })
      .optional(),
  }),
});

export const userReturn = userUpdateSchema.shape.body.omit({ password: true });

export type UserCreateInput = z.infer<typeof userCreateSchema>["body"];
export type UserUpdateInput = z.infer<typeof userUpdateSchema>["body"];
export type UserReturn = z.infer<typeof userReturn>;
export type UserIdParamsInput = z.infer<typeof userIdParamsSchema>["params"];
export type TokenParamsInput = z.infer<typeof tokenParamsSchema>["query"];
export type UserGetAllQuery = z.infer<typeof userGetAllQuery>["query"] & ParsedQs;
export type UserResetPasswordInput = z.infer<typeof userResetPasswordSchema>["body"];
export type UserForgotPasswordInput = z.infer<typeof forgotPasswordSchema>["body"];
export type UserRewardIdBodyInput = z.infer<typeof userRewardIdBodyInputSchema>["body"];
export type UserPhoneParamsInput = z.infer<typeof userPhoneParamsSchema>["params"];
export type UserEmailParamsInput = z.infer<typeof userEmailParamsSchema>["params"];
export type UserPaymentConfirmBodyInput = z.infer<typeof userPaymentConfirmBodyInputSchema>["body"];

/**
 * @openapi
 * components:
 *  schema:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *        - email
 *        - role
 *      properties:
 *        name:
 *          type: string
 *          default: Nuan Ne
 *        username:
 *          type: string
 *          default: sampleuser
 *          minLength: 5
 *          maxLength: 50
 *        password:
 *          type: string
 *          default: CHANGE_ME
 *          minLength: 8
 *          maxLength: 50
 *          format: password
 *        email:
 *          type: string
 *          default: nuanne@gmail.com
 *          format: email
 *        role:
 *          type: string
 *          enum: [ADMIN, USER, MERCHANT, STAFF, MANAGER]
 *          default: USER
 *        merchantId:
 *          type: string
 *          default:
 *        listingId:
 *          type: string
 *    ForgotPasswordInput:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          required: true
 *          minLength: 5
 *          maxLength: 50
 *        phone:
 *          type: string
 *          minLength: 5
 *          maxLength: 50
 *        extraTokenData:
 *          type: string
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - password
 *      properties:
 *        password:
 *          type: string
 *          format: password
 *          minLength: 8
 *          maxLength: 50
 *          default: CHANGE_ME
 *    UserRewardIdBodyInput:
 *      type: object
 *      required:
 *        - rewardId
 *      properties:
 *        rewardId:
 *          type: string
 *    UserWithListingsResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        deviceToken:
 *          type: string
 *        merchantId:
 *          type: string
 *        listings:
 *          type: array
 *          items:
 *            type: object
 *        roles:
 *          type: array
 *          items:
 *            type: string
 *            enum: [ADMIN, USER, MERCHANT, STAFF, MANAGER]
 *        username:
 *          type: string
 *        withMobile:
 *          type: boolean
 *        profile:
 *          type: object
 *          properties:
 *            address:
 *              type: string
 *            birthday:
 *              type: string
 *            bookmarks:
 *              type: string
 *            dp:
 *              type: string
 *            fullName:
 *              type: string
 *            gender:
 *              type: string
 *            idle:
 *              type: string
 *            lastLogin:
 *              type: string
 *              format: date-time
 *            location:
 *              type: object
 *              properties:
 *                ip:
 *                  type: string
 *            mobile:
 *              type: string
 *            online:
 *              type: boolean
 *        emails:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *              verified:
 *                type: boolean
 *        bookmarks:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        likes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        activity:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              details:
 *                type: string
 *              event:
 *                type: string
 *              time:
 *                type: string
 *                format: date-time
 *    UserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        deviceToken:
 *          type: string
 *        merchantId:
 *          type: string
 *        roles:
 *          type: array
 *          items:
 *            type: string
 *            enum: [ADMIN, USER, MERCHANT, STAFF, MANAGER]
 *        username:
 *          type: string
 *        withMobile:
 *          type: boolean
 *        profile:
 *          type: object
 *          properties:
 *            address:
 *              type: string
 *            birthday:
 *              type: string
 *            bookmarks:
 *              type: string
 *            dp:
 *              type: string
 *            fullName:
 *              type: string
 *            gender:
 *              type: string
 *            idle:
 *              type: string
 *            lastLogin:
 *              type: string
 *              format: date-time
 *            location:
 *              type: object
 *              properties:
 *                ip:
 *                  type: string
 *            mobile:
 *              type: string
 *            online:
 *              type: boolean
 *        emails:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *              verified:
 *                type: boolean
 *        bookmarks:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        likes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        activity:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              details:
 *                type: string
 *              event:
 *                type: string
 *              time:
 *                type: string
 *                format: date-time
 *    UserResponseWithPlan:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        deviceToken:
 *          type: string
 *        merchantId:
 *          type: string
 *        roles:
 *          type: array
 *          items:
 *            type: string
 *            enum: [ADMIN, USER, MERCHANT, STAFF, MANAGER]
 *        username:
 *          type: string
 *        withMobile:
 *          type: boolean
 *        profile:
 *          type: object
 *          properties:
 *            address:
 *              type: string
 *            birthday:
 *              type: string
 *            bookmarks:
 *              type: string
 *            dp:
 *              type: string
 *            fullName:
 *              type: string
 *            gender:
 *              type: string
 *            idle:
 *              type: string
 *            lastLogin:
 *              type: string
 *              format: date-time
 *            location:
 *              type: object
 *              properties:
 *                ip:
 *                  type: string
 *            mobile:
 *              type: string
 *            online:
 *              type: boolean
 *        emails:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *              verified:
 *                type: boolean
 *        bookmarks:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        likes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              date:
 *                type: string
 *                format: date-time
 *              listingId:
 *                type: string
 *        activity:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              details:
 *                type: string
 *              event:
 *                type: string
 *              time:
 *                type: string
 *                format: date-time
 *        plan:
 *          $ref: '#/components/schema/PlanResponse'
 *        subscription:
 *          $ref: '#/components/schema/SubscriptionResponse'
 *        customerActivities:
 *          type: object
 *          properties:
 *            totalSpent:
 *              type: number
 *            totalPointEarn:
 *              type: number
 *            totalPointSpent:
 *              type: number
 *            averagePerMonth:
 *              type: number
 *            activities:
 *              type: array
 *              items:
 *                $ref: '#/components/schema/CustomerActivityResponses'
 *
 *
 */
