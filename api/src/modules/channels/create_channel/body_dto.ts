import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { ChannelDocument } from "src/modules/data";

export class CreateChannelBodyDTO implements Omit<ChannelDocument, '_id' | 'name' | 'type' | 'members' | 'guild_id'> {
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