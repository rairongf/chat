import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserDocument, UserRepository } from 'src/modules/data';

@Injectable()
export class ValidateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email' | '_id'>> {
    const user = await this.userRepository.model
      .findOne<UserDocument>(
        {
          email: email,
        },
        {
          password: 1,
          _id: 1,
          email: 1,
        },
        {},
      )
      .lean({ getters: true });

    if (!user) {
      console.log('Could not find user');
      throw new UnauthorizedException();
    }

    /* if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result };
    } */

    if (user && password == user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result };
    }

    console.log('Passwords did not match');
    throw new UnauthorizedException();
  }
}
