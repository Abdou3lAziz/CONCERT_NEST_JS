import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from './reservation.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel: Model<Reservation>,
    private readonly mailService: MailerService,
  ) {}

  async sendMail(
    recepteur: string,
    message: string,
    email_ticket: string,
    qrcode: string,
  ) {
    await this.mailService.sendMail({
      from: 'FAAS',
      to: recepteur,
      subject: `RESERVATION DE TICKET`,
      text: message,
      html: `<h3>Felicitation, vous venez de recevoir votre ticket</h3>`,
      attachments: [
        {
          // the QR code image attached
          filename: 'QR_code.png',
          path: qrcode,
        },
      ],
    });
  }

  async create(
    titre: string,
    date: string,
    lieu: string,
    montant: number,
    email: string,
    created_at: Date,
  ) {
    const newReservation = new this.reservationModel({
      titre,
      date,
      lieu,
      montant,
      email,
      created_at,
    });
    const resul = await newReservation.save();
    return resul.id as string;
  }

  async findAll() {
    const reservations = await this.reservationModel.find().exec();
    return reservations.map((reservation) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: reservation.id,
      titre: reservation.titre,
      date: reservation.date,
      lieu: reservation.lieu,
      montant: reservation.montant,
      email: reservation.email,
      created_at: reservation.created_at,
    }));
  }

  async findOne(id: string) {
    const reservation = await this.findReservation(id);
    if (reservation) {
      return {
        id: reservation.id,
        titre: reservation.titre,
        date: reservation.date,
        lieu: reservation.lieu,
        montant: reservation.montant,
        email: reservation.email,
        created_at: reservation.created_at,
      };
    } else {
      return 'Reservation introuvable';
    }
  }
  async getReservNumbers() {
    const count = await this.reservationModel.countDocuments();
    return count;
  }

  // update(id: number, updateReservationDto: UpdateReservationDto) {
  //   return `This action updates a #${id} reservation`;
  // }

  async remove(id: string) {
    const result = await this.reservationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    } else {
      return 'Reservation supprimé avec succès';
    }
  }

  private async findReservation(id: string): Promise<Reservation> {
    let reservation: Reservation | PromiseLike<Reservation> | null;
    try {
      reservation = await this.reservationModel.findById(id).exec();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new NotFoundException('Could not find reservation.');
    }
    if (!reservation) {
      throw new NotFoundException('Could not find reservation.');
    }

    return reservation;
  }
}
