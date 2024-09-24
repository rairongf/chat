import { Avatar, Button, Column, Row } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export function RecentChatsTabItem({
  label,
  picture,
  date,
  onClick,
}: {
  label: string;
  picture?: string;
  date: Date;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { theme } = useTheme();
  const { formatDate } = useLanguage();

  let initials: string | undefined;
  if (!picture) {
    const segments = label.split(" ");
    initials =
      segments.length > 2
        ? `${segments.at(0)}${segments.at(1)}`
        : label.substring(0, 2);
  }

  return (
    <Button
      className={twJoin(
        "w-full h-12 py-1.5 px-2.5 rounded-md",
        theme.colors.background.primaryHoverHighlighted
      )}
      type="button"
      onClick={onClick}
    >
      <Row className="h-full gap-2 justify-start items-stretch">
        <Avatar
          containerProps={{
            className: "",
          }}
          imgProps={
            picture
              ? {
                  src: picture,
                  width: 80,
                  height: 80,
                  className:
                    "h-full max-w-min aspect-square object-contain rounded-full",
                  alt: "Friend Profile Picture",
                }
              : undefined
          }
          initials={initials}
        />
        <Column className="justify-center items-start gap-0.5 text-start">
          <span className="font-semibold leading-none">{label}</span>
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
