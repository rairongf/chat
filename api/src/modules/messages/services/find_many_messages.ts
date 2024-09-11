import { Injectable } from "@nestjs/common";
import { MessageRepository } from "src/modules/data";
import { Types } from "mongoose";
import { FindManyMessagesQueryParamsDTO } from "../dtos";

@Injectable()
export class FindManyMessagesService {
  constructor(
    private readonly repository: MessageRepository,
  ) { }

  async handle(userId: Types.ObjectId, query: FindManyMessagesQueryParamsDTO) {
    const channels = await this.repository.model.find({
      channel_id: query.channel_id,
    }, {
      _id: 1,
      sender_id: 1,
      channel_id: 1,
      content: 1,
      createdAt: 1,
      updatedAt: 1,
    }, {
      skip: query.limit * (query.page - 1),
      limit: query.limit,
    }).exec();

    return channels;
  }
}