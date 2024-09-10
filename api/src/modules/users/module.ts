import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { CreateUserService } from './create_user';

@Module({
  providers: [CreateUserService],
  controllers: [UsersController],
})
export class UsersModule { }
