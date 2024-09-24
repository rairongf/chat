import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractDocument } from './base_document';
import { User } from './user';

export type GuildDocument = HydratedDocument<Guild>;

@Schema({
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true,
  versionKey: false,
})
export class Guild extends AbstractDocument {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: false,
  })
  picture?: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: true,
    },
  ])
  members: User[];
}

const GuildSchema = SchemaFactory.createForClass(Guild);
GuildSchema.virtual('channels', {
  ref: 'Channel',
  localField: '_id',
  foreignField: 'guildId',
  match: { deletedAt: null }
});

export { GuildSchema };

