import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { UserRepository } from "src/modules/data";

@Injectable()
export class FindMeService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async handle(userId: Types.ObjectId) {
    const user = await this.userRepository.model.find({
      _id: userId,
    }, {
      _id: 1,
      name: 1,
      username: 1,
      picture: 1,
      about: 1,
      createdAt: 1,
      birthday: 1,
      email: 1,
    }).lean({ getters: true }).exec();

    return user;
  }
}