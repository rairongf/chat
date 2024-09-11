import { Type } from "class-transformer";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { PaginationQueryParamsDTO } from "src/dtos";

export class FindManyUsersQueryParamsDTO extends PaginationQueryParamsDTO {
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  guild_id?: Types.ObjectId;
}