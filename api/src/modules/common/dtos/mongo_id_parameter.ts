import { Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class MongoIdParam {
  @Type(() => Types.ObjectId)
  @IsMongoId()
  id: Types.ObjectId;
}
