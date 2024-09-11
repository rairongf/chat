import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { GenerateUserTokenService } from "./generate_user_token";

@Injectable()
export class LoginService {
  constructor(
    private readonly generateUserTokenService: GenerateUserTokenService,
  ) { }

  async handle(user: {
    _id: string;
    email: string;
  }) {
    const token = await this.generateUserTokenService.handle({
      _id: new Types.ObjectId(user._id),
      email: user.email,
    });
    return token;
  }
}