import { BaseContextProps, Guild, User } from "@/modules/common";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../auth/context";
import { useInitializeSessionState } from "./domain/usecases";
import { findManyGuilds, findUser } from "./infra/repositories";

type SessionContextData = {
  user?: User;
  guilds: Guild[];
};

export const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
);

export function SessionProvider({ children }: BaseContextProps) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User>();
  const [guilds, setGuilds] = useState<Guild[]>([]);

  const { initializeState } = useInitializeSessionState(
    findUser,
    findManyGuilds
  );

  const init = useCallback(async () => {
    const result = await initializeState({});
    if (!result.didSucceed) return;

    setUser(result.user!);
    setGuilds(result.guilds!);
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(undefined);
    }
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider value={{ user, guilds }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
