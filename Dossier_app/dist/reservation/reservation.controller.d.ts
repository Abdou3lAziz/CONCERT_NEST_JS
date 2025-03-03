import { ReservationService } from './reservation.service';
import { Response } from 'express';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    getTicketReserve(): void;
    getTicketVerify(ticket_id: any, res: Response): Promise<void>;
    create(reservationTitre: string, reservationDate: string, reservationLieu: string, reservationMontant: number, reservationEmail: string, res: Response): Promise<void>;
    findAll(): Promise<{
        id: any;
        titre: string;
        date: string;
        lieu: string;
        montant: number;
        email: string;
        created_at: string;
    }[]>;
    findOne(id: string): Promise<"Reservation introuvable" | {
        id: string;
        titre: string;
        date: string;
        lieu: string;
        montant: number;
        email: string;
        created_at: string;
    }>;
    remove(id: string): Promise<string>;
}
