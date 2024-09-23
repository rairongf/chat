import { BaseUsecase, Guild } from '@/modules/common';

export type IAddGuildUsecaseArguments = {name: string; picture?: File;};

export type IAddGuildUsecase = BaseUsecase<Guild | undefined, IAddGuildUsecaseArguments>;
