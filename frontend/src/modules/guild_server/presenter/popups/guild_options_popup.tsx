import { Button, Column, Icon, Row, useDialog } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";
import { AddGuildChannelDialog } from "../dialogs/add_channel";

type GuildOptionsItemData = {
  label: string;
  iconName: string;
  onClick: () => void;
  highlight?: boolean;
};

export function GuildOptionsPopup() {
  const { resource } = useLanguage();
  const { theme } = useTheme();
  const { show, removeAny } = useDialog();

  const options: GuildOptionsItemData[] = [
    /* {
      label: resource.guildOptionsPopup.addCategory,
      iconName: "add",
      onClick: () => {},
    }, */
    {
      label: resource.guildOptionsPopup.inviteMember,
      iconName: "group_add",
      onClick: () => {},
      highlight: true,
    },
    {
      label: resource.guildOptionsPopup.addChannel,
      iconName: "add_circle",
      onClick: () =>
        show(
          <AddGuildChannelDialog
            onClose={removeAny}
            onConfirm={(data) => {
              removeAny();
              console.log("data:", data);
            }}
          />,
          {
            key: "add_guild_channel_dialog",
          }
        ),
    },
  ];

  return (
    <Column
      className={twJoin(
        "rounded shadow-md max-w-56 w-56 max-h-80 mx-2 overflow-clip p-2 gap-0.5",
        theme.colors.background.focus
      )}
    >
      {options.map((data, index) => {
        return (
          <Button
            key={index}
            onClick={() => data.onClick()}
            className={twJoin(
              "px-2 py-0.5 rounded",
              theme.colors.background.hoverBlurple,
              theme.colors.text.hoverWhite,
              data.highlight ? theme.colors.text.black : theme.colors.text.base
            )}
          >
            <Row className="justify-between items-center gap-2 font-semibold">
              <span className={twJoin("text-sm")}>{data.label}</span>
              <Icon name={data.iconName} className="text-lg" />
            </Row>
          </Button>
        );
      })}
    </Column>
  );
}
