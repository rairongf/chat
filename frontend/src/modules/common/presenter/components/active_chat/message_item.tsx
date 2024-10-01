import { Column, InitialsAvatar, PictureAvatar, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export type MessageItemProps = {
  senderPicture?: string;
  senderName: string;
  senderUsername: string;
  date: Date;
  content: string;
  shouldShowAvatar: boolean;
};

export function MessageItem({
  date,
  content,
  senderPicture,
  senderName,
  senderUsername,
  shouldShowAvatar,
}: MessageItemProps) {
  const { theme } = useTheme();

  return (
    <Row
      className={twJoin(
        "group mr-1.5 justify-start items-center w-full whitespace-nowrap",
        theme.colors.background.primaryHover,
        senderPicture ? "py-1" : "py-0.5",
        shouldShowAvatar ? "mt-4" : ""
      )}
    >
      <Row className="w-[4.5rem] justify-end items-center mr-2 h-full">
        {shouldShowAvatar && senderPicture && (
          <PictureAvatar
            avatar={{
              className: "h-[3rem]",
            }}
            src={senderPicture}
            alt={senderName}
          />
        )}
        {shouldShowAvatar && !senderPicture && (
          <InitialsAvatar
            avatar={{
              className: twJoin("h-[3rem]", theme.colors.background.tertiary),
            }}
            name={senderName}
          />
        )}

        {!shouldShowAvatar && (
          <div className="invisible group-hover:visible text-xs h-full">
            <time dateTime={date.toISOString()}>
              {date.toLocaleString("pt-BR", {
                timeStyle: "short",
              })}
            </time>
          </div>
        )}
      </Row>
      <Column className="justify-start items-start grow shrink basis-auto">
        {shouldShowAvatar && (
          <Row className="justify-start items-center gap-2">
            <span className="font-bold text-start">{senderUsername}</span>
            <time className="text-start text-xs" dateTime={date.toISOString()}>
              {date.toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </time>
          </Row>
        )}
        <span className="font-medium text-start text-base leading-snug">
          {content}
        </span>
      </Column>
    </Row>
  );
}
