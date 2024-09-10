
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/module';
import { ChannelRepository, GuildRepository, UserRepository } from './repositories';
import { Channel, ChannelSchema, Guild, GuildSchema, Message, MessageSchema, User, UserSchema } from './schemas';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    // Register schemas
    MongooseModule.forFeature([
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    ChannelRepository,
    UserRepository,
    GuildRepository,
  ],
  exports: [
    ChannelRepository,
    UserRepository,
    GuildRepository,
  ],
})
export class DataModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}