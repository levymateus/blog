const Error = (props) => {
  return <div>
      Error: {props.error.message}
    <details>
      {JSON.stringify(props)}
    </details>
  </div>
}

export default Error
