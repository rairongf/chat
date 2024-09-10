import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AbstractDocument, Channel, User } from ".";

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Message extends AbstractDocument {

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name, autopopulate: true })
  sender_id: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Channel.name })
  channel_id: Channel;
}

export const MessageSchema = SchemaFactory.createForClass(Message);