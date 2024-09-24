import { BaseUsecase } from '@/modules/common';
import { GuildSummary } from '../../models';

export type IAddGuildUsecaseArguments = {name: string; picture?: File;};

export type IAddGuildUsecase = BaseUsecase<GuildSummary | undefined, IAddGuildUsecaseArguments>;
