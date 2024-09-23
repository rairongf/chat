import { BaseUsecase } from "@/modules/common";

export type IInitializeGuildServerStateUsecaseArguments = {
  guildId: string;
};

export type IInitializeGuildServerStateUsecaseResponse = {
  didSucceed: boolean;
  defaultChannelId?: string;
};

export type IInitializeGuildServerStateUsecase = BaseUsecase<
  IInitializeGuildServerStateUsecaseResponse,
  IInitializeGuildServerStateUsecaseArguments>;