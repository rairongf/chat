import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Guild, GuildDocument } from "../schemas";

export class GuildRepository {
  constructor(
    @InjectModel(Guild.name) readonly model: Model<GuildDocument>,
  ) { }
}