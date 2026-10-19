export function isHttpUrl(value: string): boolean {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function isAssetUrl(value: string): boolean {
  if (!value) return true
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('..') && !value.includes('\\')) {
    return true
  }
  return isHttpUrl(value)
}

export function limitedStrings(maxItems: number, maxLength: number) {
  return {
    validator(values: string[]) {
      return (
        values.length <= maxItems &&
        values.every((value) => value.trim().length > 0 && value.trim().length <= maxLength)
      )
    },
    message: `Use at most ${maxItems} entries of ${maxLength} characters or fewer.`,
  }
}
