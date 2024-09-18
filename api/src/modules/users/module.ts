import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { CreateUserService, FindManyUsersService, FindSessionUserService } from './services';

@Module({
  providers: [CreateUserService, FindManyUsersService, FindSessionUserService],
  controllers: [UsersController],
})
export class UsersModule { }
