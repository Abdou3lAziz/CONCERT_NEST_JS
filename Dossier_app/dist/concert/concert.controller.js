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
exports.ConcertController = void 0;
const common_1 = require("@nestjs/common");
const concert_service_1 = require("./concert.service");
const platform_express_1 = require("@nestjs/platform-express");
let ConcertController = class ConcertController {
    concertService;
    constructor(concertService) {
        this.concertService = concertService;
    }
    getRegister() { }
    async create(concertTitre, concertArtiste, concertDate, concertLieu, concertMontant, file, res) {
        console.log(file);
        console.log('-----------');
        console.log(file.path);
        if (concertTitre == undefined ||
            concertArtiste == undefined ||
            concertDate == undefined ||
            concertLieu == undefined ||
            concertMontant == undefined ||
            file == undefined) {
            return res.render('concert', {
                message: 'Veillez remplir tous les champs!',
            });
        }
        const dateCreation = new Date();
        const imagePath = `/uploads/${file.filename}`;
        await this.concertService.create(concertTitre, concertArtiste, concertDate, concertLieu, concertMontant, imagePath, dateCreation);
        return { url: 'admin/dashboard' };
    }
    findAll() {
        return this.concertService.findAll();
    }
    findOne(id) {
        return this.concertService.findOne(id);
    }
    update(id, concertTitre, concertArtiste, concertDate, concertLieu, concertMontant, concertImage) {
        return this.concertService.update(id, concertTitre, concertArtiste, concertDate, concertLieu, concertMontant, concertImage);
    }
    remove(id) {
        return this.concertService.remove(id);
    }
};
exports.ConcertController = ConcertController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('concert'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConcertController.prototype, "getRegister", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage')),
    __param(0, (0, common_1.Body)('titre')),
    __param(1, (0, common_1.Body)('artiste')),
    __param(2, (0, common_1.Body)('date')),
    __param(3, (0, common_1.Body)('lieu')),
    __param(4, (0, common_1.Body)('montant')),
    __param(5, (0, common_1.UploadedFile)()),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConcertController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConcertController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('titre')),
    __param(2, (0, common_1.Body)('artiste')),
    __param(3, (0, common_1.Body)('date')),
    __param(4, (0, common_1.Body)('lieu')),
    __param(5, (0, common_1.Body)('montant')),
    __param(6, (0, common_1.Body)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, String]),
    __metadata("design:returntype", void 0)
], ConcertController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConcertController.prototype, "remove", null);
exports.ConcertController = ConcertController = __decorate([
    (0, common_1.Controller)('concert'),
    __metadata("design:paramtypes", [concert_service_1.ConcertService])
], ConcertController);
//# sourceMappingURL=concert.controller.js.map