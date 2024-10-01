import { Message, User } from "@/modules/common";

export type MessageDetails = Omit<Message, 'sender'> & {
  sender: Pick<User, '_id' | 'name' | 'picture' | 'username'>;
};