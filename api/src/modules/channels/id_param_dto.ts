import { Type } from "class-transformer";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class ChannelIdParam {
  @Type(() => Types.ObjectId)
  @IsMongoId()
  id: Types.ObjectId;
}