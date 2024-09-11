import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
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
        _id: new Types.ObjectId(),
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        about: '',
        birthday: data.birthday,
        picture: data.picture ?? `https://eu.ui-avatars.com/api/?name=${data.name.split(' ').join('+')}&size=128`,
      }
    ], {});

    const user = users.at(0) as UserDocument;

    return user;
  }
}