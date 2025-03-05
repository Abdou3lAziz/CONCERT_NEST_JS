import { Controller, Get, Render, Session } from '@nestjs/common';
import { ConcertService } from 'src/concert/concert.service';

@Controller('/')
export class HomeController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  @Render('index')
  async root(@Session() session: Record<string, any>) {
    const FindAll = await this.concertService.findAll();
    const islogged = session.connected
    console.log(islogged);
    return { AllConcert: FindAll,islogged};
  }

  @Get('viewevents')
  @Render('viewevents')
  async view() {
    const Find = await this.concertService.findAll();
    return { All: Find };
  }
}
