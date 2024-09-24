import { BaseContextProps, ReactUseState } from "@/modules/common";
import { createContext, useContext, useState } from "react";
import { GuildDetails } from "./domain/models";

export type GuildState = Omit<GuildDetails, "members" | "channels"> | undefined;
export type GuildMembersState = GuildDetails["members"];
export type GuildChannelsState = GuildDetails["channels"];

type GuildServerStateContextData = {
  guildState: ReactUseState<GuildState>;
  membersState: ReactUseState<GuildMembersState>;
  channelsState: ReactUseState<GuildChannelsState>;
};

export const GuildServerStateContext =
  createContext<GuildServerStateContextData>({} as GuildServerStateContextData);

export function GuildServerStateProvider({ children }: BaseContextProps) {
  const guildState = useState<GuildState>();
  const membersState = useState<GuildMembersState>([]);
  const channelsState = useState<GuildChannelsState>([]);

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
