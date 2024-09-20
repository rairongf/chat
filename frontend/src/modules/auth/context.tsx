"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BaseContextProps } from "../common";
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
  signIn: ISignInUsecase;
  signOut: ISignOutUsecase;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: BaseContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { keepSignIn } = useKeepSignIn();
  const { signIn } = useSignIn(login);
  const { signOut } = useSignOut();

  async function _signIn({ email, password }: ISignInUsecaseArguments) {
    const { didSucceed } = await signIn({ email, password });
    setIsAuthenticated(didSucceed);
    return { didSucceed };
  }

  async function _signOut() {
    const didSucceed = await signOut({});
    if (didSucceed) {
      setIsAuthenticated(false);
    }
    return didSucceed;
  }

  async function _init() {
    const didSucceed = await keepSignIn({});
    setIsAuthenticated(didSucceed);
    if (!didSucceed) return;
  }

  useEffect(() => {
    _init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    signIn: _signIn,
    signOut: _signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
