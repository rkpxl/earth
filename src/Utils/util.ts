export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  duration = 500,
): ((...args: T) => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, duration)
  }
}
