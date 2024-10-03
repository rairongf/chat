import { BaseUsecase, Channel, User } from '@/modules/common';

export type IAddNewDMChannelUsecase = BaseUsecase<{didSucceed: boolean; channel?: Channel;}, {
  friend: User;
}>;
