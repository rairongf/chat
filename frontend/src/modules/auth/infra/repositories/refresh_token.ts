
import { BaseRepository, Token } from '@/modules/common';
import { api } from '../../../common/infra/services/server/api';

interface RefreshTokenRepositoryArguments {
  refreshToken: string;
}

export type IRefreshTokenRepository = BaseRepository<Token, RefreshTokenRepositoryArguments>;

export const refreshToken: IRefreshTokenRepository = ({
  refreshToken
}: RefreshTokenRepositoryArguments) => {
  return api.post<Token>('/auth/refresh-token', {
    refreshToken
  });
};
