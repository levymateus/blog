
const If = ({ stmt, children }) => {
  if (stmt) return children
  return null
}

export default If
