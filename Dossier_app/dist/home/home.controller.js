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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const concert_service_1 = require("../concert/concert.service");
let HomeController = class HomeController {
    concertService;
    constructor(concertService) {
        this.concertService = concertService;
    }
    async root() {
        const FindAll = await this.concertService.findAll();
        return { AllConcert: FindAll };
    }
    async view() {
        const Find = await this.concertService.findAll();
        return { All: Find };
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "root", null);
__decorate([
    (0, common_1.Get)('viewevents'),
    (0, common_1.Render)('viewevents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "view", null);
exports.HomeController = HomeController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [concert_service_1.ConcertService])
], HomeController);
//# sourceMappingURL=home.controller.js.map