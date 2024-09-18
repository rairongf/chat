import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayload } from 'src/modules/common';
import { ValidateUserService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserService: ValidateUserService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserPayload> {
    const user = await this.validateUserService.handle(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { userId: user._id, email: user.email };
  }
}
