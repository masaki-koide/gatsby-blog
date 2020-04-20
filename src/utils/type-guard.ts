export const isNotNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined
}
