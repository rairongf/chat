import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AbstractDocument } from './base_document';
import { User } from './user';

export type GuildDocument = HydratedDocument<Guild>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Guild extends AbstractDocument {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  picture: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: true,
    },
  ])
  members: User[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
