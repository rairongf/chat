import { Message, User } from "src/modules/data";

export interface MessagePayload extends Omit<Message, 'sender'> {
  sender: Pick<User, '_id' | 'name' | 'username' | 'picture'>
}