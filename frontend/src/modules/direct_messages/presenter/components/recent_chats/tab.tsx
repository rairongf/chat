import { Button, Column, Dialog, Icon, Row, useDialog } from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";
import { useDirectMessages } from "../../context";
import { RecentChatsTabItem } from "./item";

export function RecentChatsTab() {
  const { theme } = useTheme();
  const { show, removeAny } = useDialog();
  const { resource } = useLanguage();
  const { channels, connectToChannel } = useDirectMessages();

  return (
    <aside
      className={twJoin(
        "min-w-60 w-60 max-w-60 h-full p-2",
        theme.colors.background.secondary
      )}
    >
      <Column className="gap-1">
        <Row
          className={twJoin(
            "w-full justify-between items-center mb-2 pl-2.5 pr-2",
            theme.colors.text.highlighted
          )}
        >
          <span className="uppercase text-xs leading-none font-bold">
            {resource.directMessages.recentChatsTabTitle}
          </span>
          <Button
            className="flex justify-center items-center"
            onClick={() => {
              show(
                <Dialog.Container onClose={removeAny}>
                  Test Dialog
                </Dialog.Container>,
                { key: "add_direct_message" }
              );
            }}
          >
            <Icon className="text-sm font-bold" name="add" />
          </Button>
        </Row>
        {channels.map((channel, i) => {
          return (
            <RecentChatsTabItem
              key={i}
              name={channel.name}
              date={channel.createdAt}
              onClick={() => connectToChannel({ channelId: channel._id })}
            />
          );
        })}
      </Column>
    </aside>
  );
}
