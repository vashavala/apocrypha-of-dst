export const getStorage = (key: string) => {
  const uniqueKey = `vasha-${key}`
  const storage = localStorage.getItem(uniqueKey)
  try {
    return storage && JSON.parse(storage)
  } catch (error) {
    return storage
  }
}

export const setStorage = (key: string, data: unknown) => {
  const uniqueKey = `vasha-${key}`
  const stringifiedData = JSON.stringify(data)
  localStorage.setItem(uniqueKey, stringifiedData)
  return data
}