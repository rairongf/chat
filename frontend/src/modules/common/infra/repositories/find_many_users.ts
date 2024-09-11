import { BaseRepository } from '@/modules/common/infra/models';
import { User } from '../../domain';
import { api } from '../services';

export type IFindManyUsersRepository = BaseRepository<User[]>;

export const findManyUsers: IFindManyUsersRepository = () => {
  return api.get(`/users`);
};
