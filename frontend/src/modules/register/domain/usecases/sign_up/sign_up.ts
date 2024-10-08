import { ISignInUsecase } from '@/modules/auth/domain/usecases';
import { ICreateUserRepository } from '@/modules/register/infra/repositories';
import { useSessionState } from '@/modules/session';
import { ISignUpUsecase } from './interface';

export function useSignUp(
  createUser: ICreateUserRepository,
  signIn: ISignInUsecase,
) {
  const {userState: [, setUser]} = useSessionState();

  const signUp: ISignUpUsecase = async (args) => {
    try {
      const { data } = await createUser({...args});

      setUser(data);
      signIn({email: args.email, password: args.password});

      return;
    } catch (err) {
      console.error('Could not sign up.', err);
    }
  };

  return signUp;
}
