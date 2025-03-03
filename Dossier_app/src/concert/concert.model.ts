import * as mongoose from 'mongoose';

export const ConcertSchema = new mongoose.Schema({
  titre: { type: String },
  artiste: { type: String },
  date: { type: String },
  lieu: { type: String },
  montant: { type: Number },
  image: { type: String },
  created_at: { type: Date },
});

export interface Concert extends mongoose.Document {
  id: string;
  titre: string;
  artiste: string;
  date: string;
  lieu: string;
  montant: number;
  image: string;
  created_at: Date;
}
