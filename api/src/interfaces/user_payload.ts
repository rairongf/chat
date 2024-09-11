import mongoose from 'mongoose';

export interface UserPayload {
  userId: mongoose.Types.ObjectId;
  email: string;
  customerId: string;
}