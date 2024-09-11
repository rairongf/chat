
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayloadDto } from 'src/dtos';
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

  async validate({ sub, email }: AccessTokenPayloadDto) {
    const user = await this.userRepository.model.findOne({
      _id: sub,
    }, undefined, undefined);

    if (!user) {
      throw new ForbiddenException('Usuário não tem acesso à esse cliente!');
    }

    return { userId: sub, email };
  }
}