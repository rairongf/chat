import { BaseRepository } from '@/modules/common/infra/models';
import { User } from '../../../common/domain';
import { api } from '../../../common/infra/services';

export type IFindUserRepository = BaseRepository<User>;

export const findUser: IFindUserRepository = () => {
  return api.get(`/users/me`);
};
