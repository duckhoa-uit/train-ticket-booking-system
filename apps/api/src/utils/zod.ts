import { Request } from 'express';
import { AnyZodObject, z, ZodError } from 'zod';
import AppError from './app-error';

export async function zParse<T extends AnyZodObject>(schema: T, req: Request): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(400, error.message);
    }
    return new AppError(400, JSON.stringify(error));
  }
}

export const stringOrNumber = z.union([
  z.string().transform((v, ctx) => {
    const parsed = parseInt(v);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a number',
      });
    }
    return parsed;
  }),
  z.number().int(),
]);

export const stringToDate = z.string().pipe(z.coerce.date());
