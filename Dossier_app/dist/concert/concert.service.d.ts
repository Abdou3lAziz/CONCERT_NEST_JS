import { Model } from 'mongoose';
import { Concert } from './concert.model';
export declare class ConcertService {
    private readonly concertModel;
    constructor(concertModel: Model<Concert>);
    create(titre: string, artiste: string, date: string, lieu: string, montant: number, image: string, created_at: Date): Promise<string>;
    findAll(): Promise<{
        id: any;
        titre: string;
        artiste: string;
        date: string;
        lieu: string;
        montant: number;
        image: string;
        created_at: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        titre: string;
        artiste: string;
        date: string;
        lieu: string;
        montant: number;
        image: string;
        created_at: Date;
    }>;
    update(id: string, concertTitre: string, concertArtiste: string, concertDate: string, concertLieu: string, concertMontant: number, concertImage: string): Promise<Concert>;
    remove(id: string): Promise<string>;
    getConcertNumber(): Promise<number>;
    private findConcert;
}
