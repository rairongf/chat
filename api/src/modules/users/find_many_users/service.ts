import { Injectable } from "@nestjs/common";
import { GuildRepository, UserDocument, UserRepository } from "src/modules/data";
import { Types } from "mongoose";
import { FindManyUsersQueryParamsDTO } from "./query_params_dto";

@Injectable()
export class FindManyUsersService {
  constructor(
    private readonly guildRepository: GuildRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyUsersQueryParamsDTO): Promise<UserDocument[]> {
    if (query.guild_id) {
      const guildUsersIds = await this.guildRepository.model.findOne({
        _id: query.guild_id,
      }, {
        members: 1,
      });

      const users = await this.userRepository.model.find({
        _id: {
          $in: [...guildUsersIds.members],
        },
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

    const users = await this.userRepository.model.find({
      _id: {
        $ne: userId,
      },
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