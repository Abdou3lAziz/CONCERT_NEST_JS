import { Reservation } from './reservation.model';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
export declare class ReservationService {
    private readonly reservationModel;
    private readonly mailService;
    constructor(reservationModel: Model<Reservation>, mailService: MailerService);
    sendMail(recepteur: string, message: string, email_ticket: string, qrcode: string): Promise<void>;
    create(titre: string, date: string, lieu: string, montant: number, email: string, created_at: Date): Promise<string>;
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
    getReservNumbers(): Promise<number>;
    remove(id: string): Promise<string>;
    private findReservation;
}
