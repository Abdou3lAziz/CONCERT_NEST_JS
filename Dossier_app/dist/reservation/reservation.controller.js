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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
let ReservationController = class ReservationController {
    reservationService;
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    getTicketReserve() { }
    async getTicketVerify(ticket_id, res) {
        const ticket = await this.reservationService.findOne(ticket_id);
        const Ticket_date = ticket['date'];
        const Ticket_id = ticket['id'];
        const Ticket_montant = ticket['montant'];
        const Ticket_lieu = ticket['lieu'];
        return res.render('ticket_verify', {
            date: Ticket_date,
            id: Ticket_id,
            montant: Ticket_montant,
            lieu: Ticket_lieu,
        });
    }
    async create(reservationTitre, reservationDate, reservationLieu, reservationMontant, reservationEmail, res) {
        console.log(reservationTitre);
        console.log(reservationDate);
        console.log(reservationLieu);
        console.log(reservationMontant);
        console.log(reservationEmail);
        const dateCreation = new Date();
        const ticket = await this.reservationService.create(reservationTitre, reservationDate, reservationLieu, reservationMontant, reservationEmail, dateCreation);
        const qrCodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/reservation/verification/${ticket}`;
        console.log(qrCodeImage);
        const mail = await this.reservationService.sendMail(reservationEmail, `TICKET: ${reservationTitre}`, reservationEmail, qrCodeImage);
        console.log(mail);
        return res.render('ticket_reserver', {
            concert: reservationTitre,
            date: reservationDate,
        });
    }
    findAll() {
        return this.reservationService.findAll();
    }
    findOne(id) {
        return this.reservationService.findOne(id);
    }
    remove(id) {
        return this.reservationService.remove(id);
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, common_1.Get)('valide'),
    (0, common_1.Render)('ticket_reserver'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getTicketReserve", null);
__decorate([
    (0, common_1.Get)('verification/:id'),
    (0, common_1.Render)('ticket_verify'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getTicketVerify", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('titre')),
    __param(1, (0, common_1.Body)('date')),
    __param(2, (0, common_1.Body)('lieu')),
    __param(3, (0, common_1.Body)('montant')),
    __param(4, (0, common_1.Body)('email')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "remove", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map