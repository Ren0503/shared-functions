export const prettyObject = (obj: {
  [key: string]: any
}) => {
  return JSON.parse(JSON.stringify(obj))
}