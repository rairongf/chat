import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayloadDto } from 'src/dtos';
import { UserPayload } from 'src/interfaces';
import { UserRepository } from 'src/modules/data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate({ sub, email }: AccessTokenPayloadDto): Promise<UserPayload> {
    const user = await this.userRepository.model
      .findOne(
        {
          _id: new Types.ObjectId(sub),
        },
        {
          _id: 1,
        },
        undefined,
      )
      .lean({ getters: true });

    if (!user) {
      throw new ForbiddenException('Usuário não tem acesso à esse recurso.');
    }

    return { userId: new Types.ObjectId(sub), email };
  }
}
