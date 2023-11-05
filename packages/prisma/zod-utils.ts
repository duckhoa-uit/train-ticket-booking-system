import z, { ZodNullable, ZodObject, ZodOptional } from "zod";

/* eslint-disable no-underscore-dangle */
import type {
  AnyZodObject,
  objectInputType,
  objectOutputType,
  ZodNullableDef,
  ZodOptionalDef,
  ZodRawShape,
  ZodTypeAny,
} from "zod";

import dayjs from "@ttbs/lib/dayjs";
import { slugify } from "@ttbs/lib/slugify";

// Let's not import 118kb just to get an enum
export enum Frequency {
  YEARLY = 0,
  MONTHLY = 1,
  WEEKLY = 2,
  DAILY = 3,
  HOURLY = 4,
  MINUTELY = 5,
  SECONDLY = 6,
}

// dayjs iso parsing is very buggy - cant use :( - turns ISO string into Date object
export const iso8601 = z.string().transform((val, ctx) => {
  const time = Date.parse(val);
  if (!time) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid ISO Date",
    });
  }
  const d = new Date();
  d.setTime(time);
  return d;
});

export const slug = z.string().transform((val) => slugify(val.trim()));

export const stringToDate = z.string().transform((a) => new Date(a));

export const stringOrNumber = z.union([
  z.string().transform((v, ctx) => {
    const parsed = parseInt(v);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a number",
      });
    }
    return parsed;
  }),
  z.number().int(),
]);

export const stringToDayjs = z.string().transform((val) => dayjs(val));

/**
 * Ensures that it is a valid HTTP URL
 * It automatically avoids
 * -  XSS attempts through javascript:alert('hi')
 * - mailto: links
 */
export const successRedirectUrl = z
  .union([
    z.literal(""),
    z
      .string()
      .url()
      .regex(/^http(s)?:\/\/.*/),
  ])
  .optional();

export type ZodDenullish<T extends ZodTypeAny> = T extends ZodNullable<infer U> | ZodOptional<infer U>
  ? ZodDenullish<U>
  : T;

export type ZodDenullishShape<T extends ZodRawShape> = {
  [k in keyof T]: ZodDenullish<T[k]>;
};

export const denullish = <T extends ZodTypeAny>(schema: T): ZodDenullish<T> =>
  (schema instanceof ZodNullable || schema instanceof ZodOptional
    ? denullish((schema._def as ZodNullableDef | ZodOptionalDef).innerType)
    : schema) as ZodDenullish<T>;

type UnknownKeysParam = "passthrough" | "strict" | "strip";

/**
 * @see https://github.com/3x071c/lsg-remix/blob/e2a9592ba3ec5103556f2cf307c32f08aeaee32d/app/lib/util/zod.ts
 */
export function denullishShape<
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam = "strip",
  Catchall extends ZodTypeAny = ZodTypeAny,
  Output = objectOutputType<T, Catchall>,
  Input = objectInputType<T, Catchall>
>(
  obj: ZodObject<T, UnknownKeys, Catchall, Output, Input>
): ZodObject<ZodDenullishShape<T>, UnknownKeys, Catchall> {
  const a = entries(obj.shape).map(([field, schema]) => [field, denullish(schema)] as const) as {
    [K in keyof T]: [K, ZodDenullish<T[K]>];
  }[keyof T][];
  return new ZodObject({
    ...obj._def,
    shape: () => fromEntries(a) as unknown as ZodDenullishShape<T>, // TODO: Safely assert type
  });
}

/**
 * Like Object.entries, but with actually useful typings
 * @param obj The object to turn into a tuple array (`[key, value][]`)
 * @returns The constructed tuple array from the given object
 * @see https://github.com/3x071c/lsg-remix/blob/e2a9592ba3ec5103556f2cf307c32f08aeaee32d/app/lib/util/entries.ts
 */
export const entries = <O extends Record<string, unknown>>(
  obj: O
): {
  readonly [K in keyof O]: [K, O[K]];
}[keyof O][] => {
  return Object.entries(obj) as {
    [K in keyof O]: [K, O[K]];
  }[keyof O][];
};

/**
 * Returns a type with all readonly notations removed (traverses recursively on an object)
 */
type DeepWriteable<T> = T extends Readonly<{
  -readonly [K in keyof T]: T[K];
}>
  ? {
      -readonly [K in keyof T]: DeepWriteable<T[K]>;
    }
  : T; /* Make it work with readonly types (this is not strictly necessary) */

type FromEntries<T> = T extends [infer Keys, unknown][]
  ? { [K in Keys & PropertyKey]: Extract<T[number], [K, unknown]>[1] }
  : never;

/**
 * Like Object.fromEntries, but with actually useful typings
 * @param arr The tuple array (`[key, value][]`) to turn into an object
 * @returns Object constructed from the given entries
 * @see https://github.com/3x071c/lsg-remix/blob/e2a9592ba3ec5103556f2cf307c32f08aeaee32d/app/lib/util/fromEntries.ts
 */
export const fromEntries = <
  E extends [PropertyKey, unknown][] | ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: E
): FromEntries<DeepWriteable<E>> => {
  return Object.fromEntries(entries) as FromEntries<DeepWriteable<E>>;
};

/** Facilitates converting values from Select inputs to plain ones before submitting */
export const optionToValueSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z
    .object({
      label: z.string(),
      value: valueSchema,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .transform((foo) => (foo as any).value as z.infer<T>);

/**
 * Allows parsing without losing original data inference.
 * @url https://github.com/colinhacks/zod/discussions/1655#discussioncomment-4367368
 */
export const getParserWithGeneric =
  <T extends AnyZodObject>(valueSchema: T) =>
  <Data>(data: Data) => {
    type Output = z.infer<T>;
    type SimpleFormValues = string | number | null | undefined;
    return valueSchema.parse(data) as {
      // TODO: Invesitage why this broke on zod 3.22.2 upgrade
      [key in keyof Data]: Data[key] extends SimpleFormValues ? Data[key] : Output[key];
    };
  };

// The PR at https://github.com/colinhacks/zod/pull/2157 addresses this issue and improves email validation
// I introduced this refinement(to be used with z.email()) as a short term solution until we upgrade to a zod
// version that will include updates in the above PR.
export const emailSchemaRefinement = (value: string) => {
  const emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
  return emailRegex.test(value);
};
export const coerceToDate = z.coerce.date();
