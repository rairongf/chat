import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractDocument } from './base_document';
import { Guild } from './guild';
import { User } from './user';

export enum ChannelType {
  PRIVATE = 'private',
  GUILD_TEXT_CHANNEL = 'guild_text_channel',
}

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform(_, ret: Partial<ChannelDocument>, __) {
      const name =
        ret.type == ChannelType.PRIVATE
          ? ret.members.find(
              (member: any) => member._id.toString() !== ret._id.toString(),
            ).name
          : ret.name;

      return {
        ...ret,
        name: name,
      };
    },
  },
})
export class Channel extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ChannelType, default: ChannelType.PRIVATE })
  type: ChannelType;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: true,
    },
  ])
  members: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Guild.name })
  guildId?: Guild;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
