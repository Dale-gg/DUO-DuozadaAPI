export default function arrayOnly(data: any, keys: any): [] {
  return keys.reduce((prev: any, key: any) => {
    if (data[key]) {
      prev[key] = data[key]
    }
    return prev
  }, {})
}
