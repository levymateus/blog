import LoadingState from "context/LoadingState"

export default function withLoading(Wrapper) {
  return ({ children, ...props }) => <LoadingState>
    {(loadingProps) => <Wrapper {...loadingProps} {...props}>{children}</Wrapper>}
  </LoadingState>
}
