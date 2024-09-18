import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import { Channel } from 'src/modules/data';

export class CreateChannelBodyDTO
  implements
    Omit<
      Channel,
      | '_id'
      | 'type'
      | 'name'
      | 'members'
      | 'guildId'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
{
  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.memberId))
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.memberId))
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  guildId?: Types.ObjectId;

  @ValidateIf((obj: CreateChannelBodyDTO) => Boolean(!obj.guildId))
  @IsOptional()
  @Type(() => Types.ObjectId)
  @IsMongoId()
  memberId?: Types.ObjectId;
}
