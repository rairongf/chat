
import { ILoginRepository } from '@/modules/auth/infra/repositories';
import { CookiesKeys, IFindUserRepository } from '@/modules/common';
import { useRouter } from 'next/navigation';
import { destroyCookie, setCookie } from 'nookies';
import { ISignInUsecase, ISignInUsecaseArguments } from './interface';

export function useSignIn(
  login: ILoginRepository,
  findUser: IFindUserRepository,
) {
  const router = useRouter();

  const signIn: ISignInUsecase = async ({ email, password }: ISignInUsecaseArguments) => {
    try {
      const { data, didSucceed } = await login({ email, password });

      if (!didSucceed) {
        console.log('Could not authenticate');
        return {didSucceed};
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

      const response = await findUser({});
      if (!response.didSucceed) {
        console.log('Could not find user');
        return {didSucceed: response.didSucceed};
      }
      

      router.push('/channels/@me');
      await new Promise((r) => setTimeout(r, 600));
      return {didSucceed: true, user: response.data};
    } catch (err) {
      console.log('Caught error:', err);
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);

      router.push('/login');

      return {didSucceed: false};
    }
  };

  return { signIn };
}
