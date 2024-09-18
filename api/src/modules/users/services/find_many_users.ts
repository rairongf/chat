import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { ChatPaginatedResponse } from 'src/modules/common';
import {
  GuildRepository,
  User,
  UserDocument,
  UserRepository,
} from 'src/modules/data';
import { FindManyUsersQueryParamsDTO } from '../dtos/find_many_users_query_params_dto';

@Injectable()
export class FindManyUsersService {
  constructor(
    private readonly guildRepository: GuildRepository,
    private readonly userRepository: UserRepository,
  ) { }

  async handle(
    userId: Types.ObjectId,
    query: FindManyUsersQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<User>> {
    if (query.guildId) {
      return this.queryGuildMembers(userId, query);
    }

    try {
      const filter: FilterQuery<UserDocument> = {
        _id: {
          $ne: userId,
        },
      };

      const count = await this.userRepository.model.countDocuments(filter);

      const users = await this.userRepository.model
        .find(
          filter,
          {
            _id: 1,
            name: 1,
            username: 1,
          },
          {
            skip: query.limit * (query.page - 1),
            limit: query.limit,
          },
        )
        .exec();

      return {
        elements: [...users],
        currentPage: query.page,
        totalElements: count,
        totalPages: Math.ceil(count / query.limit),
      };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException('Unknown error while finding users');
    }
  }

  private async queryGuildMembers(
    userId: Types.ObjectId,
    query: FindManyUsersQueryParamsDTO,
  ): Promise<ChatPaginatedResponse<User>> {
    try {
      const guildUsersIds = await this.guildRepository.model.findOne(
        {
          _id: query.guildId
        },
        {
          members: 1
        },
      ).lean({ getters: true }).exec();

      if (!guildUsersIds) {
        throw new NotFoundException('Could not find guild');
      }

      if (guildUsersIds.members.length == 0) {
        return {
          elements: [],
          currentPage: query.page,
          totalElements: 0,
          totalPages: 1,
        };
      }

      const count = guildUsersIds.members.length - 1;

      const users = await this.userRepository.model
        .find(
          {
            _id: {
              $in: [...guildUsersIds.members.filter((m) => m._id != userId)],
            },
          },
          {
            _id: 1,
            name: 1,
            username: 1,
          },
          {
            skip: query.limit * (query.page - 1),
            limit: query.limit,
          },
        )
        .exec();

      return {
        elements: users,
        currentPage: query.page,
        totalElements: count,
        totalPages: Math.ceil(count / query.limit),
      };
    } catch (err) {
      console.error(`[${typeof this}] Error:`, err);
      throw new InternalServerErrorException('Unknown error while finding guild members');
    }
  }
}
