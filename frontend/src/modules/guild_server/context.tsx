import {
  BaseContextProps,
  Channel,
  findManyChannels,
  Guild,
  User,
} from "@/modules/common";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useInitializeGuildServerState } from "./domain/usecases";
import { findGuildMembers } from "./infra/repositories";
import { useGuildServerState } from "./state";

type GuildServerContextData = {
  guild: Guild | undefined;
  members: User[];
  channels: Channel[];
};

export const GuildServerContext = createContext<GuildServerContextData>(
  {} as GuildServerContextData
);

type GuildServerContextProps = BaseContextProps & {
  guildId: string;
};

export function GuildServerProvider({
  children,
  guildId,
}: GuildServerContextProps) {
  const {
    guildState: [guild],
    membersState: [members],
    channelsState: [channels],
  } = useGuildServerState();
  const router = useRouter();

  const { initializeGuildServerState } = useInitializeGuildServerState(
    findGuildMembers,
    findManyChannels
  );

  async function init() {
    const response = await initializeGuildServerState({ guildId });
    if (!response.didSucceed || !response.defaultChannelId) return;

    router.push(`/channels/${guildId}/${response.defaultChannelId!}`);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <GuildServerContext.Provider value={{ guild, members, channels }}>
      {children}
    </GuildServerContext.Provider>
  );
}

export const useGuildServer = () => useContext(GuildServerContext);
