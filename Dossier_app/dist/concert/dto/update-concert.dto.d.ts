import { CreateConcertDto } from './create-concert.dto';
declare const UpdateConcertDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateConcertDto>>;
export declare class UpdateConcertDto extends UpdateConcertDto_base {
    titre: string;
    artiste: string;
    date: Date;
    lieu: string;
    montant: string;
}
export {};
