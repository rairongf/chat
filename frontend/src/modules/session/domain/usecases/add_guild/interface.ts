import { BaseUsecase } from '@/modules/common';

export type IAddGuildUsecaseArguments = {name: string; picture?: File;};

export type IAddGuildUsecase = BaseUsecase<void, IAddGuildUsecaseArguments>;
