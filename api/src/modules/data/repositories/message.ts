import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "../schemas";

export class MessageRepository {
  constructor(
    @InjectModel(Message.name) readonly model: Model<MessageDocument>,
  ) { }
}