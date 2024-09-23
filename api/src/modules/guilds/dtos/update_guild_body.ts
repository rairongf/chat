import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Guild } from 'src/modules/data';

export class UpdateGuildBodyDTO
  implements
  Omit<
    Guild,
    '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'members' | 'name' | 'picture'
  > {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
