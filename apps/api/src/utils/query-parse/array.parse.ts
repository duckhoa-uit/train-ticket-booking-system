import { z, ZodTypeAny } from 'zod'

export const arrayFromString = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj
    } else if (typeof obj === 'string') {
      return obj.split(',')
    } else {
      return []
    }
  }, z.array(schema))
}
