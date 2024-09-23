import {
  Button,
  Column,
  Dialog,
  Icon,
  Row,
  Tooltip,
  useDialog,
} from "@/modules/common";
import { useLanguage } from "@/modules/language";
import { useTheme } from "@/modules/theme";
import { twJoin } from "tailwind-merge";
import { useDirectMessages } from "../../context";
import { RecentChatsTabItem } from "./item";
import { RecentChatsTabNavigationOption } from "./navigation_option";

export function RecentChatsTab() {
  const { theme } = useTheme();
  const { show, removeAny } = useDialog();
  const { resource } = useLanguage();
  const { channels, connectToChannel } = useDirectMessages();

  return (
    <aside
      className={twJoin(
        "min-w-60 w-60 max-w-60 h-full p-2 overflow-y-auto overflow-x-visible",
        theme.colors.background.secondary
      )}
    >
      <Column className="gap-[2px]">
        <RecentChatsTabNavigationOption
          iconName="group"
          label="Amigos"
          routePath={"/channels/@me"}
          unreadNotificationsCount={4}
        />
        <RecentChatsTabNavigationOption
          iconName="star_outline"
          label="Troni"
          routePath={"/troni"}
          disableNavigation
        />
        <RecentChatsTabNavigationOption
          iconName="storefront"
          label="Loja"
          routePath={"/store"}
          disableNavigation
        />
      </Column>
      <Column className="gap-1 mt-5">
        <Row
          className={twJoin(
            "w-full max-w-56 justify-between items-center mb-2 pl-2.5 pr-2",
            theme.colors.text.highlighted
          )}
        >
          <span className="uppercase text-xs leading-none font-bold">
            {resource.directMessages.recentChatsTabTitle}
          </span>
          <Tooltip message="Criar DM">
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
          </Tooltip>
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
