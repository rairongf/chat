import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards';
import { AuthModule } from './modules/auth/module';
import { ChannelsModule } from './modules/channels/module';
import { ConfigModule } from './modules/config/module';
import { DataModule } from './modules/data/module';
import { MessagesModule } from './modules/messages/module';
import { UploadModule } from './modules/upload/module';
import { UsersModule } from './modules/users/module';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
