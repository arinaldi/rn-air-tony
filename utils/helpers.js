export const generateId = () => Math.random().toString(36).substr(2, 9)

export const formatDate = (isoDate) => {
  const date = new Date(isoDate)

  return date.toDateString().substring(4)
}
