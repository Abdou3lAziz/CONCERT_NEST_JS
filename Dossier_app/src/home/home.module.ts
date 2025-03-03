import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { ConcertModule } from 'src/concert/concert.module';
import { ConcertService } from 'src/concert/concert.service';
import { ConcertController } from 'src/concert/concert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from 'src/concert/concert.model';

@Module({
  imports: [
    ConcertModule,
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }]),
  ],
  controllers: [HomeController, ConcertController],
  providers: [HomeService, ConcertService],
})
export class HomeModule {}
