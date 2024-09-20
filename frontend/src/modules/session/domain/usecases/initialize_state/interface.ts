import { BaseUsecase, Guild, User } from '@/modules/common';

export type IInitializeSessionStateUsecase = BaseUsecase<{didSucceed: boolean; user?: User; guilds?: Guild[]}>;
