import { BaseUsecase } from '@/modules/common/domain/models';

type DidSucceed = boolean;

export type ISignOutUsecase = BaseUsecase<DidSucceed>;
