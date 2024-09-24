import mongoose from "mongoose";

export { InjectConnection } from "@nestjs/mongoose";
export { Connection } from 'mongoose';

export abstract class DatabaseTransactionService {
  constructor(private readonly connection: mongoose.Connection) { }

  protected async transaction<T>(
    callback: (session: mongoose.mongo.ClientSession) => Promise<T>
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();

    const result = await callback(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  }
}

/* export async function transaction<T>(
  callback: (session: mongoose.mongo.ClientSession) => Promise<T>
) {
  console.log('Using transaction session...');
  return mongoose.connection.transaction<T>(async (session) => {
    const result = await callback(session);
    session.endSession();
    return result;
  });
} */