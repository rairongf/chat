import { Type } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { PaginationQueryParamsDTO } from 'src/modules/common';

export class FindManyChannelsQueryParamsDTO extends PaginationQueryParamsDTO {
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  guildId?: Types.ObjectId;
}
