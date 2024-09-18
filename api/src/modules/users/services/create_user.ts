import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { User, UserRepository } from 'src/modules/data';
import { CreateUserBodyDTO } from '../dtos/create_user_body_dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: UserRepository) { }

  async handle(data: CreateUserBodyDTO): Promise<User> {
    try {
      const user = await this.repository.model.create({
        _id: new Types.ObjectId(),
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        about: '',
        birthday: data.birthday,
        picture:
          data.picture ??
          `https://eu.ui-avatars.com/api/?name=${data.name.split(' ').join('+')}&size=128`,
      });

      return { ...user };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException('Unknown error while creating user');
    }
  }
}
