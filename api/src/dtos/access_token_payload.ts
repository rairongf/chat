import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class AccessTokenPayloadDto {
  @IsNotEmpty()
  @Transform(
    ({ value }: { value: string }) => new mongoose.Types.ObjectId(value),
  )
  sub: string;

  @IsNotEmpty()
  email: string;
}