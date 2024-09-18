import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import * as data from 'src/modules/data';
import { Public, UserJWT, UserPayload } from '../common';
import { CreateUserBodyDTO, CreateUserService } from './create_user';
import {
  FindManyUsersQueryParamsDTO,
  FindManyUsersService,
} from './find_many_users';
import { FindMeService } from './find_me';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly findManyUsersService: FindManyUsersService,
    private readonly findMeService: FindMeService,
  ) { }

  @Public()
  @Post()
  async create(@Body() body: CreateUserBodyDTO) {
    return this.createService.handle(body);
  }

  @Get()
  async findMany(
    @UserJWT() user: UserPayload,
    @Query() query: FindManyUsersQueryParamsDTO,
  ) {
    return this.findManyUsersService.handle(user.userId, query);
  }

  @Get('me')
  async findUser(
    @UserJWT() user: UserPayload,
  ): Promise<Omit<data.User, 'password'>> {
    return this.findMeService.handle(user.userId);
  }
}
