import {
  BaseContextProps,
  Channel,
  findManyChannels,
  findManyUsers,
  Guild,
  User,
} from "@/modules/common";
import { createContext, useContext, useEffect } from "react";
import { useInitializeGuildServerState } from "./domain/usecases";
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

  const { initializeGuildServerState } = useInitializeGuildServerState(
    findManyUsers,
    findManyChannels
  );

  useEffect(() => {
    initializeGuildServerState({ guildId });
  }, []);

  return (
    <GuildServerContext.Provider value={{ guild, members, channels }}>
      {children}
    </GuildServerContext.Provider>
  );
}

export const useGuildServer = () => useContext(GuildServerContext);
