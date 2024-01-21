import Text from "@components/Text"
import clsx from "clsx"

const DateText = ({ date = new DateText(), isLoading = false, size = "sm" }) => {
  const datetimeformat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  })
  return <Text variant="neutral" size={size}>
    <span className={clsx("p-1 flex italic hover:cursor-default", {
      "skeleton skeleton-text select-none hover:cursor-default pointer-events-none": isLoading,
    })}>
      {datetimeformat.format(date)}
    </span>
  </Text>
}

export default DateText
