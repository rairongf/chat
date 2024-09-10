import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { Channel } from "src/modules/data";

export class CreateChannelBodyDTO implements Omit<Channel, '_id' | 'type' | 'name' | 'members' | 'guild_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.member_id))
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string = null;

  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.member_id))
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  guild_id?: Types.ObjectId;

  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.guild_id))
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  member_id?: Types.ObjectId;
}