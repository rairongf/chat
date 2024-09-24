import { Channel } from "./channel";

export interface Message {
  _id: string;
  senderId: string;
  senderUsername?: string;
  senderPicture?: string;
  channelId: Channel['_id'];
  content: string;
  createdAt: Date;
}