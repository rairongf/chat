import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { AbstractDocument } from "./base_document";

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true, versionKey: false, })
export class Token extends AbstractDocument {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({ type: String, required: true })
  accessToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);