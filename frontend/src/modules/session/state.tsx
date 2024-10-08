"use client";

import { BaseContextProps, ReactUseState, User } from "@/modules/common";
import { createContext, useContext, useState } from "react";
import { GuildSummary } from "./domain/models";

type SessionStateContextData = {
  userState: ReactUseState<User | undefined>;
  guildsState: ReactUseState<GuildSummary[]>;
};

export const SessionStateContext = createContext<SessionStateContextData>(
  {} as SessionStateContextData
);

export function SessionStateProvider({ children }: BaseContextProps) {
  const userState = useState<User>();
  const guildsState = useState<GuildSummary[]>([]);

  return (
    <SessionStateContext.Provider value={{ userState, guildsState }}>
      {children}
    </SessionStateContext.Provider>
  );
}

export const useSessionState = () => useContext(SessionStateContext);
