import { BaseUsecase } from "@/modules/common";

export type IConnectToChannelUsecaseArguments = {
  channelId: string;
};

export type IConnectToChannelUsecaseResponse = {
  isConnected: boolean;
};

export type IConnectToChannelUsecase = BaseUsecase<IConnectToChannelUsecaseResponse, IConnectToChannelUsecaseArguments>;
