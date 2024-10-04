import { refreshToken } from '@/modules/auth/infra/repositories';
import { useAuthState } from '@/modules/auth/state';
import { CookiesKeys } from '@/modules/common';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { IKeepSignInUsecase } from './interface';

export function useKeepSignIn() {
  const {isAuthenticatedState: [, setIsAuthenticated]} = useAuthState();

  const keepSignIn: IKeepSignInUsecase = async () => {
    try {

      const {
        [CookiesKeys.accessToken]: accessToken,
        [CookiesKeys.refreshToken]: refreshTokenData,
        //[CookiesKeys.keepAuth]: keepAuth
      } = parseCookies();

      /// If access token and refresh token are found
      if (accessToken && refreshTokenData) {
        setIsAuthenticated(true);
        return;
      }

      // If only refresh token is found
      if (!accessToken && refreshTokenData) {
        const { data, didSucceed } = await refreshToken({ refreshToken: refreshTokenData });
        if (!didSucceed) {
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
      }

      /// If neither access token nor refresh token is found
      setIsAuthenticated(false);
      return;
    } catch (err) {
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);
      setIsAuthenticated(false);

      return;
    }
  };

  return { keepSignIn };
}
