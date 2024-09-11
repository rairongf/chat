
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/module';
import { ChannelRepository, GuildRepository, MessageRepository, TokenRepository, UserRepository } from './repositories';
import { Channel, ChannelSchema, Guild, GuildSchema, Message, MessageSchema, Token, TokenSchema, User, UserSchema } from './schemas';

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
      { name: Token.name, schema: TokenSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: User.name, schema: UserSchema },
      { name: Guild.name, schema: GuildSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    TokenRepository,
    UserRepository,
    ChannelRepository,
    GuildRepository,
    MessageRepository,
  ],
  exports: [
    TokenRepository,
    UserRepository,
    ChannelRepository,
    GuildRepository,
    MessageRepository
  ],
})
export class DataModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}