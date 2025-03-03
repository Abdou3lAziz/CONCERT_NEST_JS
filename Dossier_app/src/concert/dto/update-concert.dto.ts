import { PartialType } from '@nestjs/mapped-types';
import { CreateConcertDto } from './create-concert.dto';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateConcertDto extends PartialType(CreateConcertDto) {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  artiste: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsString()
  @IsNotEmpty()
  montant: string;
}
