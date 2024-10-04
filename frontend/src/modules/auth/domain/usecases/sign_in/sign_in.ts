
import { ILoginRepository } from '@/modules/auth/infra/repositories';
import { useAuthState } from '@/modules/auth/state';
import { CookiesKeys } from '@/modules/common';
import { destroyCookie, setCookie } from 'nookies';
import { ISignInUsecase, ISignInUsecaseArguments } from './interface';

export function useSignIn(
  login: ILoginRepository,
) {
  const {isAuthenticatedState: [, setIsAuthenticated]} = useAuthState();

  const signIn: ISignInUsecase = async ({ email, password }: ISignInUsecaseArguments) => {
    try {
      const { data, didSucceed } = await login({ email, password });

      if (!didSucceed) {
        console.log('Could not authenticate');
        setIsAuthenticated(false);
        return;
      }

      const now = new Date();

      setCookie(undefined, CookiesKeys.accessToken, data.accessToken, {
        maxAge: (data.accessTokenExpiresAt.getTime() - now.getTime()) * 1000,
        path: '/'
      });

      setCookie(undefined, CookiesKeys.refreshToken, data.refreshToken, {
        maxAge: (data.refreshTokenExpiresAt.getTime() - now.getTime()) * 1000,
        path: '/'
      });
      

      setIsAuthenticated(true);
      return;
    } catch (err) {
      console.log('Caught error:', err);
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);

      setIsAuthenticated(false);
      return;
    }
  };

  return { signIn };
}
