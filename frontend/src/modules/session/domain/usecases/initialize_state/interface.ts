import { BaseUsecase, User } from '@/modules/common';
import { GuildSummary } from '../../models';

type IInitializeSessionStateUsecaseResponse = {
  didSucceed: boolean;
  user?: User;
  guilds?: GuildSummary[];
};

export type IInitializeSessionStateUsecase = BaseUsecase<IInitializeSessionStateUsecaseResponse>;
