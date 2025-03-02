import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concert } from './concert.model';

@Injectable()
export class ConcertService {
  constructor(
    @InjectModel('Concert') private readonly concertModel: Model<Concert>,
  ) {}

  async create(
    titre: string,
    artiste: string,
    date: string,
    lieu: string,
    montant: number,
    image: string,
    created_at: Date,
  ) {
    const newConcert = new this.concertModel({
      titre,
      artiste,
      date,
      lieu,
      montant,
      image,
      created_at,
    });

    const resul = await newConcert.save();
    return resul.id as string;
  }

  async findAll() {
    const concerts = await this.concertModel.find().exec();
    return concerts.map((concert) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: concert.id,
      titre: concert.titre,
      artiste: concert.artiste,
      date: concert.date,
      lieu: concert.lieu,
      montant: concert.montant,
      image: concert.image,
      created_at: concert.created_at,
    }));
  }

  async findOne(id: string) {
    const concert = await this.findConcert(id);
    return {
      id: concert.id,
      titre: concert.titre,
      artiste: concert.artiste,
      date: concert.date,
      lieu: concert.lieu,
      montant: concert.montant,
      image: concert.image,
      created_at: concert.created_at,
    };
  }

  async update(
    id: string,
    concertTitre: string,
    concertArtiste: string,
    concertDate: string,
    concertLieu: string,
    concertMontant: number,
    concertImage: string,
  ) {
    const updateConcert = await this.findConcert(id);

    if (concertTitre) {
      updateConcert.titre = concertTitre;
    }
    if (concertArtiste) {
      updateConcert.artiste = concertArtiste;
    }
    if (concertDate) {
      updateConcert.date = concertDate;
    }
    if (concertLieu) {
      updateConcert.lieu = concertLieu;
    }
    if (concertMontant) {
      updateConcert.montant = concertMontant;
    }
    if (concertImage) {
      updateConcert.image = concertImage;
    }

    const savedUser = await updateConcert.save();

    return savedUser;
  }

  async remove(id: string) {
    const result = await this.concertModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user.');
    } else {
      return 'Concert supprimé avec succès';
    }
  }
  async getConcertNumber() {
    const count = await this.concertModel.countDocuments();
    return count;
  }

  private async findConcert(id: string): Promise<Concert> {
    let concert;
    try {
      concert = await this.concertModel.findById(id).exec();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new NotFoundException('Could not find concert.');
    }
    if (!concert) {
      throw new NotFoundException('Could not find concert.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return concert;
  }
}
