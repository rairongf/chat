
type ISignUpUsecaseArguments = {
  email: string;
  username: string;
  name?: string;
  password: string;
  birthday: Date;
  newsletter?: boolean;
};

export type ISignUpUsecase = (args: ISignUpUsecaseArguments) => Promise<void>;
