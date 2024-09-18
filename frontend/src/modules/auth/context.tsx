"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseContextProps, findUser, User } from "../common";
import {
  ISignInUsecase,
  ISignInUsecaseArguments,
  ISignOutUsecase,
  useKeepSignIn,
  useSignIn,
  useSignOut,
} from "./domain/usecases";
import { login } from "./infra/repositories";

type AuthContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  signIn: ISignInUsecase;
  signOut: ISignOutUsecase;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: BaseContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const { keepSignIn } = useKeepSignIn();
  const { signIn } = useSignIn(login, findUser);
  const { signOut } = useSignOut();

  async function _signIn({ email, password }: ISignInUsecaseArguments) {
    const { didSucceed, user } = await signIn({ email, password });
    setIsAuthenticated(didSucceed);
    if (user) setUser(user);
    return { didSucceed, user };
  }

  async function _signOut() {
    const didSucceed = await signOut({});
    if (didSucceed) {
      setIsAuthenticated(false);
      setUser(undefined);
    }
    return didSucceed;
  }

  async function _init() {
    const didSucceed = await keepSignIn({});
    setIsAuthenticated(didSucceed);
    if (!didSucceed) return;

    const response = await findUser({});
    if (!response.didSucceed) {
      console.log("Could not find user. Error:", response.error);
      return;
    }
    setUser({ ...response.data });
  }

  useEffect(() => {
    _init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    signIn: _signIn,
    signOut: _signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
