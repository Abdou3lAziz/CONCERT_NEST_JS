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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
let ReservationService = class ReservationService {
    reservationModel;
    mailService;
    constructor(reservationModel, mailService) {
        this.reservationModel = reservationModel;
        this.mailService = mailService;
    }
    async sendMail(recepteur, message, email_ticket, qrcode) {
        await this.mailService.sendMail({
            from: 'FAAS',
            to: recepteur,
            subject: `RESERVATION DE TICKET`,
            text: message,
            html: `<h3>Felicitation, vous venez de recevoir votre ticket</h3>`,
            attachments: [
                {
                    filename: 'QR_code.png',
                    path: qrcode,
                },
            ],
        });
    }
    async create(titre, date, lieu, montant, email, created_at) {
        const newReservation = new this.reservationModel({
            titre,
            date,
            lieu,
            montant,
            email,
            created_at,
        });
        const resul = await newReservation.save();
        return resul.id;
    }
    async findAll() {
        const reservations = await this.reservationModel.find().exec();
        return reservations.map((reservation) => ({
            id: reservation.id,
            titre: reservation.titre,
            date: reservation.date,
            lieu: reservation.lieu,
            montant: reservation.montant,
            email: reservation.email,
            created_at: reservation.created_at,
        }));
    }
    async findOne(id) {
        const reservation = await this.findReservation(id);
        if (reservation) {
            return {
                id: reservation.id,
                titre: reservation.titre,
                date: reservation.date,
                lieu: reservation.lieu,
                montant: reservation.montant,
                email: reservation.email,
                created_at: reservation.created_at,
            };
        }
        else {
            return 'Reservation introuvable';
        }
    }
    async getReservNumbers() {
        const count = await this.reservationModel.countDocuments();
        return count;
    }
    async remove(id) {
        const result = await this.reservationModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        else {
            return 'Reservation supprimé avec succès';
        }
    }
    async findReservation(id) {
        let reservation;
        try {
            reservation = await this.reservationModel.findById(id).exec();
        }
        catch (err) {
            throw new common_1.NotFoundException('Could not find reservation.');
        }
        if (!reservation) {
            throw new common_1.NotFoundException('Could not find reservation.');
        }
        return reservation;
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Reservation')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mailer_1.MailerService])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map