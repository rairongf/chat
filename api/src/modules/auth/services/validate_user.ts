import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserDocument, UserRepository } from "src/modules/data";


@Injectable()
export class ValidateUserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async handle(
    email: string,
    password: string,
  ): Promise<Pick<UserDocument, 'email' | '_id'>> {
    const user = await this.userRepository.model.findOne({
      email,
    }, undefined, undefined);

    if (!user) throw new UnauthorizedException();

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result };
    }
    return null;
  }
}