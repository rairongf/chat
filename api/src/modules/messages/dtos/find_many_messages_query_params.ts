import { Type } from "class-transformer";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { PaginationQueryParamsDTO } from "src/dtos";

export class FindManyMessagesQueryParamsDTO extends PaginationQueryParamsDTO {
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  channelId?: Types.ObjectId;
}