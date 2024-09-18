import { IsNotEmpty, IsString } from 'class-validator';
import { Guild } from 'src/modules/data';

export class CreateGuildBodyDTO
  implements
  Omit<
    Guild,
    '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'members'
  > {
  @IsString()
  @IsNotEmpty()
  name: string;
}
