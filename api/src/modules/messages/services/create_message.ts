import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { MessageDocument, MessageRepository } from "src/modules/data";
import { CreateMessageBodyDTO } from "../dtos";

@Injectable()
export class CreateMessageService {
  constructor(
    private readonly repository: MessageRepository,
  ) { }

  async handle(userId: Types.ObjectId, data: CreateMessageBodyDTO): Promise<MessageDocument> {
    const message = await this.repository.model.create({
      _id: new Types.ObjectId(),
      content: data.content,
      sender_id: userId,
      channelId: data.channelId,
    });

    return message;
  }
}