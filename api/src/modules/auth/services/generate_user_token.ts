import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { add, getUnixTime } from "date-fns";
import { Types } from "mongoose";
import { TokenDocument, TokenRepository, UserDocument } from "src/modules/data";

@Injectable()
export class GenerateUserTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) { }

  async handle(user: Pick<UserDocument, 'email' | '_id'>) {
    const refreshTokenExpiresAt = add(new Date(), { hours: 24 });
    const accessTokenExpiresAt = add(new Date(), { hours: 1 });

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user._id,
        email: user.email,
      },
      { expiresIn: getUnixTime(accessTokenExpiresAt) },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: user._id },
      { expiresIn: getUnixTime(refreshTokenExpiresAt) },
    );

    // save or update token locally
    await this.saveToken(user, accessToken, refreshToken);
    return {
      refreshTokenExpiresAt,
      accessTokenExpiresAt,
      accessToken,
      refreshToken,
    };
  }

  private async saveToken(
    user: Pick<UserDocument, '_id' | 'email'>,
    accessToken: string,
    refreshToken: string,
  ): Promise<TokenDocument> {
    const oldToken = await this.tokenRepository.model.findOne({ _id: user._id });

    if (!oldToken) {
      const token = await this.tokenRepository.model.create({
        userId: new Types.ObjectId(user._id),
        refreshToken,
        accessToken,
      });
      return token;
    }

    return await this.tokenRepository.model.findOneAndUpdate(
      { _id: oldToken._id },
      { refreshToken, accessToken },
    );
  }
}