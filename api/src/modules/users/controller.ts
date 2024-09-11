import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CreateUserBodyDTO, CreateUserService } from "./create_user";
import { Public, User } from "src/decorators";
import { FindManyUsersQueryParamsDTO, FindManyUsersService } from "./find_many_users";
import { UserPayload } from "src/interfaces";

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly findManyUsersService: FindManyUsersService,
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
  async me() { }

  @Patch(':id')
  async update() { }
}