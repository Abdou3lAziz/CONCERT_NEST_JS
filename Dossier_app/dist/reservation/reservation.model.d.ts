import * as mongoose from 'mongoose';
export declare const ReservationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date?: string | null | undefined;
    email?: string | null | undefined;
    titre?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    created_at?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date?: string | null | undefined;
    email?: string | null | undefined;
    titre?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    created_at?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    date?: string | null | undefined;
    email?: string | null | undefined;
    titre?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    created_at?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export interface Reservation extends mongoose.Document {
    id: string;
    titre: string;
    date: string;
    lieu: string;
    montant: number;
    email: string;
    created_at: string;
}
