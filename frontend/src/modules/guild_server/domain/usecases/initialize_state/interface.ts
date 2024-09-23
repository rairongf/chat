import { BaseUsecase } from "@/modules/common";

export type IInitializeGuildServerStateUsecaseArguments = {
  guildId: string;
};

export type IInitializeGuildServerStateUsecase = BaseUsecase<void, IInitializeGuildServerStateUsecaseArguments>;