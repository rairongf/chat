import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/modules/data";

export class CreateUserBodyDTO implements Omit<User, '_id' | 'about' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'guilds'> {
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
  birthday: Date;
}