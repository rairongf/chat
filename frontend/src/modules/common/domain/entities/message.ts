import { Channel } from "./channel";
import { User } from "./user";

export interface Message {
  _id: string;
  sender_id: User['_id'];
  channel_id: Channel['_id'];
  content: string;
  createdAt: Date;
}