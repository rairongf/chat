import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/modules/data';

export class CreateUserBodyDTO
  implements
  Omit<
    User,
    | '_id'
    | 'about'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'guilds'
    | 'picture'
  > {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsString()
  @IsOptional()
  picture?: string;
}
