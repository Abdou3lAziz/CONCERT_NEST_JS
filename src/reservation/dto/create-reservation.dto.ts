import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsString()
  @IsNotEmpty()
  montant: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
