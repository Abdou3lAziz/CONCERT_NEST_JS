import { Controller, Get, Render } from '@nestjs/common';
import { ConcertService } from 'src/concert/concert.service';

@Controller('/')
export class HomeController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  @Render('index')
  async root() {
    const FindAll = await this.concertService.findAll();
    return { AllConcert: FindAll };
  }

  @Get('viewevents')
  @Render('viewevents')
  async view() {
    const Find = await this.concertService.findAll();
    return { All: Find };
  }
}
