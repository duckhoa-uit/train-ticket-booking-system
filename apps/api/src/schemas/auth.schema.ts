import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email().min(5).max(50),
    password: z.string().min(8).max(50),
  }),
});
export const loginCallbackSchema = z.object({
  body: z.object({
    user: z.any(),
    account: z.any(),
    profile: z.any(),
  }),
});

export const jwtPayloadSchema = z.object({
  id: z.string().cuid(),
});

export const refreshTokenSchema = z.object({
  body: z
    .object({
      refreshToken: z.string(),
    })
    .refine((val) => val.refreshToken, {
      message: "Missing refreshToken field",
    }),
});

export type UserLoginInput = z.infer<typeof loginSchema>["body"];
export type LoginCallbackInput = z.infer<typeof loginCallbackSchema>["body"];
export type JwtPayloadSchema = z.infer<typeof jwtPayloadSchema>;
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>["body"];

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLoginInput:
 *      type: object
 *      required:
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: khoavo617@gmail.com
 *        staffId:
 *          type: string
 *        password:
 *          type: string
 *          default: Admin@1234
 *    RefreshTokenSchema:
 *      type: object
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 *    UserLoginResponse:
 *      type: object
 *      properties:
 *        access_token:
 *          type: string
 *        refresh_token:
 *          type: string
 *    UserRefreshTokenResponse:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 */
