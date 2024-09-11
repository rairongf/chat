import { refreshToken } from '@/modules/auth/infra/repositories';
import { CookiesKeys } from '@/modules/common';
import { usePathname, useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { IKeepSignInUsecase } from './interface';

export function useKeepSignIn() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateWhenAuthenticated = () => {
    if (pathname === '/' || pathname === '/login') {
      router.push('/dashboard/home');
    }
  };

  const keepSignIn: IKeepSignInUsecase = async () => {
    try {
      
      const {
        [CookiesKeys.accessToken]: accessToken,
        [CookiesKeys.refreshToken]: refreshTokenData,
        //[CookiesKeys.keepAuth]: keepAuth
      } = parseCookies();

      /// If access token and refresh token are found
      if (accessToken && refreshTokenData) {
        await new Promise((r) => setTimeout(r, 600));
        navigateWhenAuthenticated();
        return true;
      }

      // If only refresh token is found
      if (!accessToken && refreshTokenData) {
        const { data, didSucceed } = await refreshToken({ refreshToken: refreshTokenData });
        if (!didSucceed) {
          return false;
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

        await new Promise((r) => setTimeout(r, 600));
        navigateWhenAuthenticated();
        return true;
      }

      await new Promise((r) => setTimeout(r, 600));

      /// If neither access token nor refresh token is found

      router.push('/login');
      return false;
    } catch (err) {
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);

      router.push('/login');

      return false;
    }
  };

  return { keepSignIn };
}
