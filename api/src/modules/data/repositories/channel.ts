import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Channel, ChannelDocument } from "../schemas";

export class ChannelRepository {
  constructor(
    @InjectModel(Channel.name) readonly model: Model<ChannelDocument>,
  ) { }
}