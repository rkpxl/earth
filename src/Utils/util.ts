import axiosInstance from "./axiosUtil"

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


export const uploadDoc = async (doc: any) => {
  if (!(doc.file instanceof Blob)) {
    console.error(`Invalid file format for document ${doc.name}.`)
    return null // Return null or handle the error appropriately.
  }

  const formData = new FormData()
  formData.append('file', doc.file, doc.name)

  try {
    const response = await axiosInstance.post('/document/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    console.error(`Error uploading document ${doc.name}:`, error)
    throw error // Rethrow the error to handle it outside the function if needed.
  }
}
