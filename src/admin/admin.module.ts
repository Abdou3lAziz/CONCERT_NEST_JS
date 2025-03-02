import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserSchema } from '../users/users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationController } from '../reservation/reservation.controller';
import { ReservationSchema } from 'src/reservation/reservation.model';
import { ReservationModule } from 'src/reservation/reservation.module';
import { ConcertService } from 'src/concert/concert.service';
import { ConcertController } from 'src/concert/concert.controller';
import { ConcertSchema } from 'src/concert/concert.model';
import { ConcertModule } from 'src/concert/concert.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Reservation', schema: ReservationSchema },
    ]),
    ReservationModule,
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }]),
    ConcertModule,
  ],

  controllers: [
    AdminController,
    UsersController,
    ReservationController,
    ConcertController,
  ],
  providers: [AdminService, UsersService, ReservationService, ConcertService],
})
export class AdminModule {}
