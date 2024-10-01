import { twJoin } from "tailwind-merge";
import { Avatar, AvatarProps } from "./avatar";

type InitialsAvatarProps = React.HTMLAttributes<HTMLSpanElement> & {
  name: string;
  avatar?: AvatarProps;
};

export function InitialsAvatar({
  name,
  avatar,
  className,
  ...props
}: InitialsAvatarProps) {
  const nameSegments = name.split(" ");
  const initials =
    nameSegments.length > 1
      ? `${nameSegments.at(0)?.substring(0, 1)}${nameSegments
          .at(1)
          ?.substring(0, 1)}`
      : name.substring(0, 2);

  const { className: avatarClassName, ...otherAvatarProps } = { ...avatar };

  return (
    <Avatar
      className={twJoin("justify-center items-center", avatarClassName)}
      {...otherAvatarProps}
    >
      <span className={twJoin("font-semibold text-lg", className)} {...props}>
        {initials}
      </span>
    </Avatar>
  );
}
