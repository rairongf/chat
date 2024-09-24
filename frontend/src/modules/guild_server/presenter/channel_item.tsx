import { Button, Icon, Row } from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { usePathname, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

type ChannelItemProps = {
  id: string;
  guildId: string;
  channelType: "text" | "voice";
  label: string;
};

export function ChannelItem({
  channelType,
  guildId,
  label,
  id,
}: ChannelItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const isSelected = pathname.includes(id);

  let iconName: string;
  switch (channelType) {
    case "text":
      iconName = "tag";
      break;
    case "voice":
      iconName = "volume_up";
      break;
  }

  return (
    <Button
      className={twJoin(
        "flex flex-row justify-between items-center px-1 py-0.5 my-2 w-full rounded",
        isSelected
          ? theme.colors.background.tertiary
          : theme.colors.background.primaryHoverHighlighted
      )}
      onClick={() => {
        if (isSelected) return;

        router.replace(`/channels/${guildId}/${id}`);
      }}
    >
      <Row
        className={twJoin(
          "justify-start items-center basis-auto",
          theme.colors.text.highlighted
        )}
      >
        <Icon name={iconName} className="text-lg mx-2" />
        <span className="text-sm font-semibold">{label}</span>
      </Row>
    </Button>
  );
}
