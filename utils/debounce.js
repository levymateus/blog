
const debounce = (callback, delay = 1000) => {
  let time = null
  return (...args) => {
    clearTimeout(time)
    time = setTimeout(() => {
      callback(...args)
    }, delay)
  };
}

export default debounce
