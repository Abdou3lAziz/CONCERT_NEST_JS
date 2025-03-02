import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateConcertDto {
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

  @IsNotEmpty()
  image: File;
}
