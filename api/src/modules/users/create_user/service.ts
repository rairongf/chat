import { Injectable } from "@nestjs/common";
import { UserDocument, UserRepository } from "src/modules/data";
import { CreateUserBodyDTO } from "./body_dto";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly repository: UserRepository,
  ) { }

  async handle(data: CreateUserBodyDTO): Promise<UserDocument> {
    const users = await this.repository.model.create([
      {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        about: '',
        birthday: data.birthday,
      }
    ], {});

    const user = users.at(0) as UserDocument;

    return user;
  }
}