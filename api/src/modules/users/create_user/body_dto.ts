import { User } from "src/modules/data";

export class CreateUserBodyDTO implements Omit<User, '_id' | 'about' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  name: string;
  username: string;
  email: string;
  password: string;
  birthday: Date;
}