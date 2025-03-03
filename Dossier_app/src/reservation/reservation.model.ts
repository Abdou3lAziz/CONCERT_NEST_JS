import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
  titre: { type: String },
  date: { type: String },
  lieu: { type: String },
  montant: { type: Number },
  email: { type: String },
  created_at: { type: String },
});

export interface Reservation extends mongoose.Document {
  id: string;
  titre: string;
  date: string;
  lieu: string;
  montant: number;
  email: string;
  created_at: string;
}
