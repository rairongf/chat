"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BaseContextProps, findUser, User } from "../common";
import {
  ISignInUsecase,
  ISignInUsecaseArguments,
  ISignOutUsecase,
  useSignIn,
  useSignOut,
} from "./domain/usecases";
import { login } from "./infra/repositories";

type AuthContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  signIn: ISignInUsecase;
  signOut: ISignOutUsecase;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: BaseContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>();
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
    setIsAuthenticated(!didSucceed);
    return didSucceed;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        signIn: _signIn,
        signOut: _signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
