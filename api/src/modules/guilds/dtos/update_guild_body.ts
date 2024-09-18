import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Guild } from 'src/modules/data';

export class UpdateGuildBodyDTO
  implements
  Omit<
    Guild,
    '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'members'
  > {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
