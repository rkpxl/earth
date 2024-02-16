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

export const getAnalyticsColor = (index = -1, opacity = 1) => {
  const colors = [
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#FF6384',
    `rgba(255, 165, 0, ${opacity})`, // Orange (Web Color)
    `rgba(199, 21, 133, ${opacity})`, // Medium Violet Red
    `rgba(75, 192, 192, ${opacity})`, // Green
    `rgba(153, 102, 255, ${opacity})`, // Purple
  ]

  const num =
    index == -1 || index > colors.length ? Math.floor(Math.random() * colors.length) : index
  return colors[num]
}


export function replaceKeys(replace : any, target : any) {
  if (!replace || typeof replace !== 'object' || !target || (Array.isArray(target) && !target.every(obj => typeof obj === 'object'))) {
      return target;
  }

  if (Array.isArray(target)) {
      return target.map(obj => {
          if (!obj || typeof obj !== 'object') {
              return obj;
          }
          for (let key in replace) {
              if (obj.hasOwnProperty(key)) {
                  obj[replace[key]] = obj[key];
                  delete obj[key];
              }
          }
          return obj;
      });
  } else {
      for (let key in replace) {
          if (target.hasOwnProperty(key)) {
              target[replace[key]] = target[key];
              delete target[key];
          }
      }
      return target;
  }
}