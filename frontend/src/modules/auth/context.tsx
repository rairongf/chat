"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BaseContextProps } from "../common";
import {
  IKeepSignInUsecase,
  ISignInUsecase,
  ISignInUsecaseArguments,
  ISignOutUsecase,
  useKeepSignIn,
  useSignIn,
  useSignOut,
} from "./domain/usecases";

type AuthContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  keepSignIn: IKeepSignInUsecase;
  signIn: ISignInUsecase;
  signOut: ISignOutUsecase;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: BaseContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { signIn } = useSignIn();
  const { keepSignIn } = useKeepSignIn();
  const { signOut } = useSignOut();

  async function _signIn({ email, password }: ISignInUsecaseArguments) {
    const didSucceed = await signIn({ email, password });
    setIsAuthenticated(didSucceed);
    return didSucceed;
  }

  async function _signOut() {
    const didSucceed = await signOut({});
    setIsAuthenticated(!didSucceed);
    return didSucceed;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        keepSignIn,
        signIn: _signIn,
        signOut: _signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
