import { api, BaseRepository, User } from '@/modules/common';

export type ICreateUserRepository = BaseRepository<User, {
  email: string;
  username: string;
  name?: string;
  password: string;
  birthday: Date;
  newsletter?: boolean;
}>;

export const createUser: ICreateUserRepository = (args) => {
  return api.post(`/users`, {
    ...args,
    name: args.name ?? args.username,
    newsletter: args.newsletter ?? false,
  });
};
