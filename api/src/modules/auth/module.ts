import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller';
import { JwtStrategy, LocalStrategy } from './strategies';
import {
  GenerateUserTokenService,
  LoginService,
  RefreshTokenService,
  ValidateUserService,
} from './services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h', algorithm: 'HS256' },
    }),
  ],
  providers: [
    GenerateUserTokenService,
    LoginService,
    RefreshTokenService,
    ValidateUserService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
