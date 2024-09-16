import { Injectable } from "@nestjs/common";
import { FilterQuery, Types } from "mongoose";
import { ChatPaginatedResponse } from "src/interfaces";
import { GuildRepository, UserDocument, UserRepository } from "src/modules/data";
import { FindManyUsersQueryParamsDTO } from "./query_params_dto";

@Injectable()
export class FindManyUsersService {
  constructor(
    private readonly guildRepository: GuildRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyUsersQueryParamsDTO): Promise<ChatPaginatedResponse<UserDocument>> {
    if (query.guildId) {
      return this.queryGuildMembers(userId, query);
    }

    const filter: FilterQuery<UserDocument> = {
      _id: {
        $ne: userId,
      },
    };

    const count = await this.userRepository.model.countDocuments(filter);

    const users = await this.userRepository.model.find(filter, {
      _id: 1,
      name: 1,
      username: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).exec();

    return {
      elements: users,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }

  private async queryGuildMembers(userId: Types.ObjectId, query: FindManyUsersQueryParamsDTO) {
    const guildUsersIds = await this.guildRepository.model.findOne({
      _id: query.guildId,
    }, {
      members: 1,
    });

    const count = guildUsersIds.members.length - 1;

    const users = await this.userRepository.model.find({
      _id: {
        $in: [...guildUsersIds.members.filter((m) => m._id != userId)],
      },
    }, {
      _id: 1,
      name: 1,
      username: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).exec();

    return {
      elements: users,
      currentPage: query.page,
      totalElements: count,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}