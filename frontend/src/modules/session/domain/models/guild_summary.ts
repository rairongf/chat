import { Channel, Guild } from "@/modules/common";

export type GuildSummary = Pick<Guild, '_id' | 'name' | 'createdAt' | 'picture'> & {
  channels: Pick<Channel, '_id' | 'guildId' | 'name'>[];
};