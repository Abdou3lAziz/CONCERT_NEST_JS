"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ConcertService = class ConcertService {
    concertModel;
    constructor(concertModel) {
        this.concertModel = concertModel;
    }
    async create(titre, artiste, date, lieu, montant, image, created_at) {
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
        return resul.id;
    }
    async findAll() {
        const concerts = await this.concertModel.find().exec();
        return concerts.map((concert) => ({
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
    async findOne(id) {
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
    async update(id, concertTitre, concertArtiste, concertDate, concertLieu, concertMontant, concertImage) {
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
    async remove(id) {
        const result = await this.concertModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        else {
            return 'Concert supprimé avec succès';
        }
    }
    async getConcertNumber() {
        const count = await this.concertModel.countDocuments();
        return count;
    }
    async findConcert(id) {
        let concert;
        try {
            concert = await this.concertModel.findById(id).exec();
        }
        catch (err) {
            throw new common_1.NotFoundException('Could not find concert.');
        }
        if (!concert) {
            throw new common_1.NotFoundException('Could not find concert.');
        }
        return concert;
    }
};
exports.ConcertService = ConcertService;
exports.ConcertService = ConcertService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Concert')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConcertService);
//# sourceMappingURL=concert.service.js.map