
const max = (array, callback) => {
  let max = 0
  array.forEach((value) => {
    const val = callback(value)
    if (val >= max) {
      max = val
    }
  })
  return max
}

export default max
