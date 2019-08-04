export const toUniq = <T extends number | string>(array: T[]): T[] => {
  return [...new Set(array)]
}
