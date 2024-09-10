import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        //S3_STORAGE_URL: Joi.string().required(),
        //S3_ACCESS_KEY_ID: Joi.string().required(),
        //S3_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule { }