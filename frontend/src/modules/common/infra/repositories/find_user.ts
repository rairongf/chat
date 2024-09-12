import { BaseRepository } from '@/modules/common/infra/models';
import { User } from '../../domain';
import { api } from '../services';

export type IFindUserRepository = BaseRepository<User>;

export const findUser: IFindUserRepository = () => {
  return api.get(`/users/me`);
};
