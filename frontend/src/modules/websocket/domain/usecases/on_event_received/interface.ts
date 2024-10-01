import { BaseUsecase } from '@/modules/common';
import { EventPayload } from '../../models/event_payload';

export type IOnEventReceivedUsecaseArguments = EventPayload;

export type IOnEventReceivedUsecase = BaseUsecase<void, IOnEventReceivedUsecaseArguments>;
