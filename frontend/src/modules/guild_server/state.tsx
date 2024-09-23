import {
  BaseContextProps,
  Channel,
  Guild,
  ReactUseState,
  User,
} from "@/modules/common";
import { createContext, useContext, useState } from "react";

type GuildServerStateContextData = {
  guildState: ReactUseState<Guild | undefined>;
  membersState: ReactUseState<User[]>;
  channelsState: ReactUseState<Channel[]>;
};

export const GuildServerStateContext =
  createContext<GuildServerStateContextData>({} as GuildServerStateContextData);

export function GuildServerStateProvider({ children }: BaseContextProps) {
  const guildState = useState<Guild>();
  const membersState = useState<User[]>([]);
  const channelsState = useState<Channel[]>([]);

  return (
    <GuildServerStateContext.Provider
      value={{
        guildState,
        membersState,
        channelsState,
      }}
    >
      {children}
    </GuildServerStateContext.Provider>
  );
}

export const useGuildServerState = () => useContext(GuildServerStateContext);
