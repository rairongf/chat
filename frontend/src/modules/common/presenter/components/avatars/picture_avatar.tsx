import { twJoin } from "tailwind-merge";
import { ChatImage, ChatImageProps } from "../image";
import { Avatar, AvatarProps } from "./avatar";

type PictureAvatarProps = ChatImageProps & {
  avatar?: AvatarProps;
};

export function PictureAvatar({
  alt = "Picture Avatar",
  width = 128,
  height = 128,
  avatar,
  ...props
}: PictureAvatarProps) {
  const { className: avatarClassName, ...otherAvatarProps } = { ...avatar };
  const { className: imageClassName, ...otherImageProps } = props;

  return (
    <Avatar className={twJoin(avatarClassName)} {...otherAvatarProps}>
      <ChatImage
        alt={alt}
        width={width}
        height={height}
        className={twJoin("object-cover", imageClassName)}
        {...otherImageProps}
      />
    </Avatar>
  );
}
