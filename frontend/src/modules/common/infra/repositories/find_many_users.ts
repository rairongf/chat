import { BaseRepository } from '@/modules/common/infra/models';
import { PaginatedData, User } from '../../domain';
import { api } from '../services';

export type IFindManyUsersRepository = BaseRepository<PaginatedData<User>>;

export const findManyUsers: IFindManyUsersRepository = () => {
  return api.get(`/users`);
};
