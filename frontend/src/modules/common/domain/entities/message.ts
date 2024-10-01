import { Channel } from "./channel";

export interface Message {
  _id: string;
  sender: string;
  channel: Channel['_id'];
  content: string;
  createdAt: Date;
}