import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas';

export class UserRepository {
  constructor(@InjectModel(User.name) readonly model: Model<UserDocument>) {}
}
