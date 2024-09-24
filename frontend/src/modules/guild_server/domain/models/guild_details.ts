import { Channel, Guild, User } from "@/modules/common";

export type GuildDetails = Omit<Guild, 'members'> & {
  channels: Pick<Channel, '_id' | 'guildId' | 'name' | 'type'>[];
  members: Pick<User, '_id' | 'name' | 'picture' | 'username'>[];
};