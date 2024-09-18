import { Channel } from "./channel";
import { User } from "./user";

export interface Message {
  _id: string;
  senderId: User['_id'];
  channelId: Channel['_id'];
  content: string;
  createdAt: Date;
}