import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { User, UserRepository } from 'src/modules/data';

@Injectable()
export class FindSessionUserService {
  constructor(private readonly repository: UserRepository) {}

  async handle(userId: Types.ObjectId): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.repository.model
        .findOne(
          {
            _id: userId,
          },
          {
            _id: 1,
            name: 1,
            username: 1,
            picture: 1,
            about: 1,
            createdAt: 1,
            birthday: 1,
            email: 1,
          },
        )
        .lean({ getters: true });

      if (!user) {
        throw new NotFoundException('Could not find user');
      }

      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        picture: user.picture,
        about: user.about,
        createdAt: user.createdAt,
        birthday: user.birthday,
        email: user.email,
      };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException(
        'Unknown error while finding session user',
      );
    }
  }
}
