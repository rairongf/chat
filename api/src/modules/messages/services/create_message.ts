import { Injectable } from "@nestjs/common";
import { CreateMessageBodyDTO } from "../dtos";
import { Types } from "mongoose";
import { MessageDocument, MessageRepository } from "src/modules/data";

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
      channel_id: data.channel_id,
    });

    return message;
  }
}