import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators';
import { LocalAuthGuard } from './guards';
import { LoginService, RefreshTokenService } from './services';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.loginService.handle({
      _id: req.user.userId,
      email: req.user.email,
    });
  }

  @Post('token/refresh')
  async refreshToken(@Body() data: { refreshToken: string }) {
    return await this.refreshTokenService.handle(data.refreshToken);
  }
}
