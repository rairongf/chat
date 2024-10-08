import { BaseContextProps } from "@/modules/common";
import { createContext, useContext } from "react";
import { useSignIn } from "../auth/domain/usecases";
import { login } from "../auth/infra/repositories";
import { ISignUpUsecase, useSignUp } from "./domain/usecases";
import { createUser } from "./infra/repositories";

type RegisterContextData = {
  signUp: ISignUpUsecase;
};

export const RegisterContext = createContext<RegisterContextData>(
  {} as RegisterContextData
);

export function RegisterProvider({ children }: BaseContextProps) {
  const { signIn } = useSignIn(login);
  const signUp = useSignUp(createUser, signIn);

  return (
    <RegisterContext.Provider value={{ signUp }}>
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);
