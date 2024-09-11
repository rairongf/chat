import { Avatar, Column, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export type MessageItemProps = {
  senderPicture?: string;
  senderName: string;
  date: Date;
  content: string;
};

export function MessageItem({
  date,
  content,
  senderPicture,
  senderName,
}: MessageItemProps) {
  const { theme } = useTheme();

  return (
    <div
      className={twJoin(
        "relative group pl-[4.5rem] mr-1.5",
        theme.hoverMessageBackground,
        senderPicture ? "py-1" : "py-0.5",
        senderPicture ? "mt-4" : ""
      )}
    >
      <span className="absolute left-0 w-[4.5rem] text-right">
        {senderPicture && (
          <Avatar
            containerProps={{
              className: "flex justify-end mr-2",
            }}
            imgProps={{
              src: senderPicture,
              width: 80,
              height: 80,
              className: "w-[3rem] aspect-square rounded-full",
              alt: "Sender Profile Picture",
            }}
          />
        )}
        {!senderPicture && (
          <time
            className="hidden group-hover:inline-block text-xs mr-2"
            dateTime={date.toISOString()}
          >
            {date.toLocaleString("pt-BR", {
              timeStyle: "short",
            })}
          </time>
        )}
      </span>
      <Column className="justify-start items-start grow shrink basis-auto">
        {senderPicture && (
          <Row className="justify-start items-center gap-2">
            <span className="font-bold text-start">{senderName}</span>
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
    </div>
  );
}
