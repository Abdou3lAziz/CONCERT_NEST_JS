import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Res,
  Render,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Response } from 'express';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('valide')
  @Render('ticket_reserver')
  getTicketReserve() {}

  @Get('verification/:id')
  @Render('ticket_verify')
  async getTicketVerify(@Param('id') ticket_id, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const ticket = await this.reservationService.findOne(ticket_id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Ticket_date = ticket['date'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Ticket_id = ticket['id'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Ticket_montant = ticket['montant'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Ticket_lieu = ticket['lieu'];

    return res.render('ticket_verify', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      date: Ticket_date,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: Ticket_id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      montant: Ticket_montant,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      lieu: Ticket_lieu,
    });
  }

  @Post('create')
  async create(
    @Body('titre') reservationTitre: string,
    @Body('date') reservationDate: string,
    @Body('lieu') reservationLieu: string,
    @Body('montant') reservationMontant: number,
    @Body('email') reservationEmail: string,
    @Res() res: Response,
  ) {
    console.log(reservationTitre);
    console.log(reservationDate);
    console.log(reservationLieu);
    console.log(reservationMontant);
    console.log(reservationEmail);

    const dateCreation = new Date();

    const ticket = await this.reservationService.create(
      reservationTitre,
      reservationDate,
      reservationLieu,
      reservationMontant,
      reservationEmail,
      dateCreation,
    );

    const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/reservation/verification/${ticket}`;

    console.log(qrCodeImage);

    const mail = await this.reservationService.sendMail(
      reservationEmail,
      `TICKET: ${reservationTitre}`,
      reservationEmail,
      qrCodeImage,
    );

    console.log(mail);

    return res.render('ticket_reserver', {
      concert: reservationTitre,
      date: reservationDate,
    });
  }

  @Get('all')
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReservationDto: UpdateReservationDto,
  // ) {
  //   return this.reservationService.update(+id, updateReservationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
