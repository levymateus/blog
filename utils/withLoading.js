import LoadingState from "context/LoadingState"

export default function withLoading(Wrapper, loadingStateProps) {
  return ({ children, ...props }) => <LoadingState {...loadingStateProps}>
    {(loadingProps) => <Wrapper {...loadingProps} {...props}>{children}</Wrapper>}
  </LoadingState>
}
