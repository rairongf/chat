import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository, UserRepository } from 'src/modules/data';
import { GenerateUserTokenService } from './generate_user_token';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    private readonly userRepository: UserRepository,
    private readonly generateUserTokenService: GenerateUserTokenService,
  ) {}

  async handle(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new BadRequestException('Refresh token inválido');
    }

    const token = await this.tokenRepository.model.findOne({
      refreshToken: refreshToken,
    });

    if (!token) {
      throw new BadRequestException('Refresh token não encontrado');
    }

    /* const accessToken = this.jwtService.decode<AccessTokenPayload>(
      token.accessToken,
    ); */

    const user = await this.userRepository.model.findOne({
      _id: token.userId,
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return await this.generateUserTokenService.handle({ ...user });
  }
}
