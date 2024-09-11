import { Module } from '@nestjs/common';
import { UsersController } from './controller';
import { CreateUserService } from './create_user';
import { FindManyUsersService } from './find_many_users';

@Module({
  providers: [CreateUserService, FindManyUsersService],
  controllers: [UsersController],
})
export class UsersModule { }
