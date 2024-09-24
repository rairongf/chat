import { ChannelType, Row } from "@/modules/common";
import { useGuildServer } from "../context";
import { ChannelItem } from "./channel_item";
import { ChannelsListTab } from "./channels_list_tab";

export function GuildServerPageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { channels } = useGuildServer();

  return (
    <Row className={`justify-start items-stretch w-full`}>
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

      {children}
    </Row>
  );
}
