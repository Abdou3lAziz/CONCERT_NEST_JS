import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    isAdmin: boolean;
    number?: string | null | undefined;
    username?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    isAdmin: boolean;
    number?: string | null | undefined;
    username?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    isAdmin: boolean;
    number?: string | null | undefined;
    username?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export interface User extends mongoose.Document {
    id: string;
    username: string;
    email: string;
    password: string;
    number: string;
    isAdmin: boolean;
}
