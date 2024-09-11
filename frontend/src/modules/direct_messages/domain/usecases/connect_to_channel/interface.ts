import { BaseUsecase } from "@/modules/common";

export type IConnectToChannelUsecaseArguments = {
  channelId: string;
};

export type IConnectToChannelUsecase = BaseUsecase<void, IConnectToChannelUsecaseArguments>;
