import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect } from "react";
import { useInitializeGuildServerState } from "./domain/usecases";
import { findGuild } from "./infra/repositories";
import {
  GuildChannelsState,
  GuildMembersState,
  GuildState,
  useGuildServerState,
} from "./state";

type GuildServerContextData = {
  guild: GuildState;
  members: GuildMembersState;
  channels: GuildChannelsState;
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

  const { initializeGuildServerState } =
    useInitializeGuildServerState(findGuild);

  async function init() {
    const response = await initializeGuildServerState({ guildId });
    if (!response.didSucceed) return;
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
