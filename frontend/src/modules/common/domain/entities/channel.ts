import { User } from "./user";

export enum ChannelType {
  PRIVATE = 'PRIVATE',
  GUILD_TEXT_CHANNEL = 'GUILD_TEXT_CHANNEL',
}

export interface Channel {
  _id: string;
  name: string;
  type: ChannelType;
  members: (User['_id'])[];
  guildId: string;
  createdAt: Date;
}