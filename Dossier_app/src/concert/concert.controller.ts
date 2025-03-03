import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  @Render('concert')
  getRegister() {}

  @Post()
  @UseInterceptors(FileInterceptor('coverImage'))
  async create(
    @Body('titre') concertTitre: string,
    @Body('artiste') concertArtiste: string,
    @Body('date') concertDate: string,
    @Body('lieu') concertLieu: string,
    @Body('montant') concertMontant: number,
    // @Body('coverImage') concertImage: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    console.log('-----------');
    console.log(file.path);
    if (
      concertTitre == undefined ||
      concertArtiste == undefined ||
      concertDate == undefined ||
      concertLieu == undefined ||
      concertMontant == undefined ||
      file == undefined
    ) {
      return res.render('concert', {
        message: 'Veillez remplir tous les champs!',
      });
    }

    const dateCreation = new Date();
    const imagePath = `/uploads/${file.filename}`;

    await this.concertService.create(
      concertTitre,
      concertArtiste,
      concertDate,
      concertLieu,
      concertMontant,
      imagePath,
      dateCreation,
    );
    return { url: 'admin/dashboard' };
  }

  @Get('/all')
  findAll() {
    return this.concertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('titre') concertTitre: string,
    @Body('artiste') concertArtiste: string,
    @Body('date') concertDate: string,
    @Body('lieu') concertLieu: string,
    @Body('montant') concertMontant: number,
    @Body('image') concertImage: string,
  ) {
    return this.concertService.update(
      id,
      concertTitre,
      concertArtiste,
      concertDate,
      concertLieu,
      concertMontant,
      concertImage,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertService.remove(id);
  }
}
