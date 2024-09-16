import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { CreateUserService } from './create_user';
import { FindManyUsersService } from './find_many_users';
import { FindMeService } from './find_me';

@Module({
  providers: [
    CreateUserService, FindManyUsersService, FindMeService
  ],
  controllers: [UsersController],
})
export class UsersModule { }
