import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import * as data from 'src/modules/data';
import { Public, UserJWT, UserPayload } from '../common';
import { CreateUserBodyDTO, FindManyUsersQueryParamsDTO } from './dtos';
import { CreateUserService, FindManyUsersService, FindSessionUserService } from './services';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly findManyUsersService: FindManyUsersService,
    private readonly findSessionUserService: FindSessionUserService,
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
  async findSessionUser(
    @UserJWT() user: UserPayload,
  ): Promise<Omit<data.User, 'password'>> {
    return this.findSessionUserService.handle(user.userId);
  }
}
