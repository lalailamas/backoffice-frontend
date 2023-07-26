const S = {
  set: (key,val) => {
    localStorage.setItem(key,JSON.stringify(val))
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  clear: () => {
    localStorage.clear()
  },
  delete: (key) => {
    localStorage.removeItem(key)
  }
}
export default S;