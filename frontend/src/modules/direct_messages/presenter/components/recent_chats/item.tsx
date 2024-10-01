import {
  Button,
  Column,
  InitialsAvatar,
  PictureAvatar,
  Row,
} from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";

export function RecentChatsTabItem({
  label,
  picture,
  friendName,
  date,
  onClick,
}: {
  label: string;
  picture?: string;
  friendName: string;
  date: Date;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { theme } = useTheme();
  const { formatDate } = useLanguage();

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
        {picture && (
          <PictureAvatar
            avatar={{
              className: "h-full",
            }}
            src={picture}
            alt={friendName}
          />
        )}
        {!picture && (
          <InitialsAvatar
            avatar={{
              className: twJoin(theme.colors.background.tertiary),
            }}
            name={friendName}
          />
        )}
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
