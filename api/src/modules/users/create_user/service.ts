import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/modules/data";
import { CreateUserBodyDTO } from "./body_dto";

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) { }

  async handle(data: CreateUserBodyDTO): Promise<UserDocument> {
    const users = await this.model.create([
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