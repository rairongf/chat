import { BaseUsecase } from "@/modules/common";

export type ISendDirectMessageUsecaseArguments = {
  content: string;
};

export type ISendDirectMessageUsecase = BaseUsecase<void, ISendDirectMessageUsecaseArguments>;
