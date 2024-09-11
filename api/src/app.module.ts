import { Module } from '@nestjs/common';
import { ChannelsModule } from './modules/channels/module';
import { ConfigModule } from './modules/config/module';
import { DataModule } from './modules/data/module';
import { UploadModule } from './modules/upload/module';
import { UsersModule } from './modules/users/module';
import { AuthModule } from './modules/auth/module';
import { MessagesModule } from './modules/messages/module';

@Module({
  imports: [
    ConfigModule,
    DataModule,
    AuthModule,
    UploadModule,
    ChannelsModule,
    UsersModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
