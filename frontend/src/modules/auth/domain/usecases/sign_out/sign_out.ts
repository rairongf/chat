import { CookiesKeys } from '@/modules/common';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { ISignOutUsecase } from './interface';

export function useSignOut() {
  const router = useRouter();

  const signOut: ISignOutUsecase = async () => {
    try {
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);

      router.push('/login');
      return true;
    } catch (err) {
      destroyCookie(undefined, CookiesKeys.accessToken);
      destroyCookie(undefined, CookiesKeys.refreshToken);

      router.push('/login');
      return true;
    }
  };

  return { signOut };
}
