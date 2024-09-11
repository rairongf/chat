import { BaseUsecase } from '@/modules/common/domain/models';

export interface ISignInUsecaseArguments {
  email: string;
  password: string;
}

type DidSucceed = boolean;

export type ISignInUsecase = BaseUsecase<DidSucceed, ISignInUsecaseArguments>;
