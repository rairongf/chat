import {
  Button,
  Column,
  InitialsAvatar,
  PictureAvatar,
  Row,
} from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

export function RecentChatsTabItem({
  label,
  picture,
  friendName,
  date,
  channelId,
}: //onClick,
{
  label: string;
  picture?: string;
  friendName: string;
  date: Date;
  channelId: string;
  //onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { formatDate } = useLanguage();
  const channelRoutePath = `/channels/@me/${channelId}`;

  const isSelected = pathname.includes(channelRoutePath);

  return (
    <Button
      className={twJoin(
        "w-full h-12 py-1.5 px-2.5 rounded-md",
        theme.colors.background.primaryHoverHighlighted,
        isSelected ? theme.colors.background.tertiary : ""
      )}
      type="button"
      onClick={() => {
        if (isSelected) return;
        router.push(channelRoutePath);
      }}
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
