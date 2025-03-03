import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  number: { type: String },
  isAdmin: { type: Boolean, default: false },
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  password: string;
  number: string;
  isAdmin: boolean;
}
