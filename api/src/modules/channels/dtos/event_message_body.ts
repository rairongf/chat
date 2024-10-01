import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class EventMessageBodyDTO {
  @IsMongoId()
  @Type(() => Types.ObjectId)
  channelId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @Type(() => Types.ObjectId)
  senderId: string;
}