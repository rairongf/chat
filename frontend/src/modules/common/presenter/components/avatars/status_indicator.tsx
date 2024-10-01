import { twJoin } from "tailwind-merge";

type AvatarStatusIndicatorProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export function AvatarStatusIndicator({
  className,
  ...props
}: AvatarStatusIndicatorProps) {
  return (
    <span
      className={twJoin(
        "bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2",
        "border-white dark:border-gray-800 rounded-full",
        className
      )}
      {...props}
    ></span>
  );
}
