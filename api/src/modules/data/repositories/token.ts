import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../schemas';

export class TokenRepository {
  constructor(@InjectModel(Token.name) readonly model: Model<TokenDocument>) {}
}
