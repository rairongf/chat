import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { CreateUserService } from "./create_user";
import { CreateUserBodyDTO } from "./create_user/body_dto";

@Controller('users')
export class UsersController {
  constructor(
    private readonly createService: CreateUserService,
  ) { }

  @Post()
  async create(
    @Body() body: CreateUserBodyDTO,
  ) {
    return this.createService.handle(body);
  }

  @Get()
  async findMany() { }

  @Get(':id')
  async findOne() { }

  @Get('/me')
  async me() { }

  @Patch(':id')
  async update() { }
}