import { ConcertService } from 'src/concert/concert.service';
export declare class HomeController {
    private readonly concertService;
    constructor(concertService: ConcertService);
    root(session: Record<string, any>): Promise<{
        AllConcert: {
            id: any;
            titre: string;
            artiste: string;
            date: string;
            lieu: string;
            montant: number;
            image: string;
            created_at: Date;
        }[];
        islogged: any;
    }>;
    view(): Promise<{
        All: {
            id: any;
            titre: string;
            artiste: string;
            date: string;
            lieu: string;
            montant: number;
            image: string;
            created_at: Date;
        }[];
    }>;
}
