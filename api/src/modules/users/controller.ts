import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { Public, User } from "src/decorators";
import { UserPayload } from "src/interfaces";
import { CreateUserBodyDTO, CreateUserService } from "./create_user";
import { FindManyUsersQueryParamsDTO, FindManyUsersService } from "./find_many_users";
import { FindMeService } from "./find_me";

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly findManyUsersService: FindManyUsersService,
    private readonly findMeService: FindMeService,
  ) { }

  @Public()
  @Post()
  async create(
    @Body() body: CreateUserBodyDTO,
  ) {
    return this.createService.handle(body);
  }

  @Get()
  async findMany(
    @User() user: UserPayload,
    @Query() query: FindManyUsersQueryParamsDTO,
  ) {
    return this.findManyUsersService.handle(user.userId, query);
  }

  @Get(':id')
  async findOne() { }

  @Get('/me')
  async me(
    @User() user: UserPayload,
  ) {
    return this.findMeService.handle(user.userId);
  }

  @Patch(':id')
  async update() { }
}