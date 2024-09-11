import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { Message } from "src/modules/data";

export class CreateMessageBodyDTO implements Omit<Message, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'sender_id' | 'channel_id'> {
  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Types.ObjectId)
  @IsMongoId()
  channel_id: Types.ObjectId;
}