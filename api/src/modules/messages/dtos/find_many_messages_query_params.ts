import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { PaginationQueryParamsDTO } from 'src/modules/common';

export class FindManyMessagesQueryParamsDTO extends PaginationQueryParamsDTO {
  @Type(() => Types.ObjectId)
  @IsMongoId()
  @IsNotEmpty()
  channelId: Types.ObjectId;
}
