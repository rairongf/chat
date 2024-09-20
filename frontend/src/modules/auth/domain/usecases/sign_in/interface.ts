import { BaseUsecase } from '@/modules/common/domain/models';

export interface ISignInUsecaseArguments {
  email: string;
  password: string;
}

export type ISignInUsecase = BaseUsecase<{
  didSucceed: boolean;
}, ISignInUsecaseArguments>;
