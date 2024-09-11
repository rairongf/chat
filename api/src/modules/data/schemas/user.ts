import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AbstractDocument } from "./base_document";

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends AbstractDocument {

  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  picture: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    required: false,
    default: '',
  })
  about: string;

  @Prop()
  birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);