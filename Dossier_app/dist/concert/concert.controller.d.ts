import { ConcertService } from './concert.service';
import { Response } from 'express';
export declare class ConcertController {
    private readonly concertService;
    constructor(concertService: ConcertService);
    getRegister(): void;
    create(concertTitre: string, concertArtiste: string, concertDate: string, concertLieu: string, concertMontant: number, file: Express.Multer.File, res: Response): Promise<void | {
        url: string;
    }>;
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
    update(id: string, concertTitre: string, concertArtiste: string, concertDate: string, concertLieu: string, concertMontant: number, concertImage: string): Promise<import("./concert.model").Concert>;
    remove(id: string): Promise<string>;
}
