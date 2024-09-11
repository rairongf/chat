import { Injectable } from "@nestjs/common";
import { UserDocument, UserRepository } from "src/modules/data";
import { Types } from "mongoose";
import { FindManyUsersQueryParamsDTO } from "./query_params_dto";

@Injectable()
export class FindManyUsersService {
  constructor(
    private readonly repository: UserRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyUsersQueryParamsDTO): Promise<UserDocument[]> {
    const users = await this.repository.model.find({
      _id: {
        $ne: userId,
      },
      guilds: query.guild_id,
    }, {
      _id: 1,
      name: 1,
      username: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).exec();

    return users;
  }
}