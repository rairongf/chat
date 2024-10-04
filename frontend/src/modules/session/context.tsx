"use client";

import { BaseContextProps, User } from "@/modules/common";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "../auth/context";
import { GuildSummary } from "./domain/models";
import {
  IAddGuildUsecase,
  useAddGuild,
  useInitializeSessionState,
} from "./domain/usecases";
import { createGuild, findManyGuilds, findUser } from "./infra/repositories";
import { useSessionState } from "./state";

type SessionContextData = {
  user?: User;
  guilds: GuildSummary[];
  addGuild: IAddGuildUsecase;
};

export const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
);

export function SessionProvider({ children }: BaseContextProps) {
  const { isAuthenticated } = useAuth();
  const {
    userState: [user, setUser],
    guildsState: [guilds],
  } = useSessionState();
  const router = useRouter();
  const pathname = usePathname();

  const { initializeState } = useInitializeSessionState(
    findUser,
    findManyGuilds
  );

  const { addGuild } = useAddGuild(createGuild);

  useEffect(() => {
    initializeState({});
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(undefined);
      router.replace("/login");
      return;
    }

    if (pathname === "/" || pathname === "/login") {
      router.replace("/channels/@me");
      return;
    }
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider value={{ user, guilds, addGuild }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
