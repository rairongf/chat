import { useAuthState } from '@/modules/auth/state';
import { CookiesKeys } from '@/modules/common';
import { destroyCookie } from 'nookies';
import { ISignOutUsecase } from './interface';

export function useSignOut() {
  const {isAuthenticatedState: [, setIsAuthenticated]} = useAuthState();

  const signOut: ISignOutUsecase = async () => {
    destroyCookie(undefined, CookiesKeys.accessToken);
    destroyCookie(undefined, CookiesKeys.refreshToken);

    setIsAuthenticated(false);
  };

  return { signOut };
}
