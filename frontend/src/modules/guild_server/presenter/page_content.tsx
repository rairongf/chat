import {
  ChannelType,
  Column,
  Icon,
  PopupTrigger,
  Row,
  TopBar,
  usePopup,
} from "@/modules/common";
import { useTheme } from "@/modules/theme";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { useGuildServer } from "../context";
import { ChannelItem } from "./channel_item";
import { ChannelsListTab } from "./channels_list_tab";
import { GuildOptionsPopup } from "./popups/guild_options_popup";

export function GuildServerPageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  const { channels, guild } = useGuildServer();

  const guildOptionsPopupKey = "guildOptionsPopupKey";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { popupEntries } = usePopup();

  useEffect(() => {
    const popup = popupEntries.find(
      (entry) => entry.key == guildOptionsPopupKey
    );

    popup ? setIsPopupOpen(true) : setIsPopupOpen(false);
  }, [popupEntries]);

  return (
    <Row className={`justify-start items-stretch w-full`}>
      <Column className={twJoin("min-w-60 w-60 max-w-60")}>
        <PopupTrigger
          className="z-10"
          popup={<GuildOptionsPopup />}
          popupKey={guildOptionsPopupKey}
        >
          <TopBar
            className={twJoin(
              "justify-between items-center",
              theme.colors.background.secondary
            )}
          >
            <span className="text-sm">{guild?.name ?? ""}</span>
            <Icon
              className="text-lg font-bold"
              name={isPopupOpen ? "close" : "keyboard_arrow_down"}
            />
          </TopBar>
        </PopupTrigger>

        {/* Channels list tab */}
        <ChannelsListTab>
          {channels.map((channel, index) => {
            return (
              <ChannelItem
                key={index}
                id={channel._id}
                guildId={channel.guildId}
                channelType={
                  channel.type.toUpperCase() == ChannelType.GUILD_TEXT_CHANNEL
                    ? "text"
                    : "voice"
                }
                label={channel.name}
              />
            );
          })}
        </ChannelsListTab>
      </Column>

      {children}
    </Row>
  );
}
