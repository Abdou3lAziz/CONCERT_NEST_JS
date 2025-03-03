import * as mongoose from 'mongoose';
export declare const ConcertSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date?: string | null | undefined;
    titre?: string | null | undefined;
    artiste?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    image?: string | null | undefined;
    created_at?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date?: string | null | undefined;
    titre?: string | null | undefined;
    artiste?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    image?: string | null | undefined;
    created_at?: NativeDate | null | undefined;
}>> & mongoose.FlatRecord<{
    date?: string | null | undefined;
    titre?: string | null | undefined;
    artiste?: string | null | undefined;
    lieu?: string | null | undefined;
    montant?: number | null | undefined;
    image?: string | null | undefined;
    created_at?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
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
