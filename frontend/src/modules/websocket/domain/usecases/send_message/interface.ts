import { BaseUsecase } from "@/modules/common";

export type ISendMessageUsecaseArguments = {
  content: string;
};

export type ISendMessageUsecase = BaseUsecase<void, ISendMessageUsecaseArguments>;
