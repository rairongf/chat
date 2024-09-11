import { BaseRepository, ChatApiResponse, Token } from '@/modules/common';
import { api } from '../../../common/infra/services/server/api';

interface LoginRepositoryArguments {
  email: string;
  password: string;
}

interface RawToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export type ILoginRepository = BaseRepository<Token, LoginRepositoryArguments>;

export const login: ILoginRepository = async ({ email, password }: LoginRepositoryArguments) => {
  const response = await api.post<RawToken>('/auth/login', {
    email,
    password
  });
  return new ChatApiResponse<Token>(
    {
      ...response.data,
      accessTokenExpiresAt: new Date(response.data.accessTokenExpiresAt),
      refreshTokenExpiresAt: new Date(response.data.refreshTokenExpiresAt)
    },
    response.statusCode,
    response.error
  );
};
