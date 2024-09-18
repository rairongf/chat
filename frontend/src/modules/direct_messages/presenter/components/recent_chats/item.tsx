import { Avatar, Button, Column, Row } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export function RecentChatsTabItem({
  name,
  date,
  onClick,
}: {
  name: string;
  date: Date;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { theme } = useTheme();
  const { formatDate } = useLanguage();

  return (
    <Button
      className={twJoin(
        "w-full h-12 py-1.5 px-2.5 rounded-md",
        theme.hoverMessageBackground
      )}
      type="button"
      onClick={onClick}
    >
      <Row className="h-full gap-2 justify-start items-stretch">
        <Avatar
          containerProps={{
            className: "",
          }}
          imgProps={{
            src: "https://avatars.githubusercontent.com/u/43035850?v=4",
            width: 80,
            height: 80,
            className:
              "h-full max-w-min aspect-square object-contain rounded-full",
            alt: "Sender Profile Picture",
          }}
        />
        <Column className="justify-center items-start gap-0.5 text-start">
          <span className="font-semibold leading-none">{name}</span>
          <span className="text-xs leading-none">
            <span className="font-semibold">
              {formatDate(date, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </span>
        </Column>
      </Row>
    </Button>
  );
}
