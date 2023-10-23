export const booleanParse = (value: string | undefined | boolean) => {
  if (typeof value === 'string') return value === 'true' ? true : false
  return value
}
