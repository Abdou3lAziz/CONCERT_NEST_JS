"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const users_model_1 = require("../users/users.model");
const mongoose_1 = require("@nestjs/mongoose");
const users_controller_1 = require("../users/users.controller");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const reservation_service_1 = require("../reservation/reservation.service");
const reservation_controller_1 = require("../reservation/reservation.controller");
const reservation_model_1 = require("../reservation/reservation.model");
const reservation_module_1 = require("../reservation/reservation.module");
const concert_service_1 = require("../concert/concert.service");
const concert_controller_1 = require("../concert/concert.controller");
const concert_model_1 = require("../concert/concert.model");
const concert_module_1 = require("../concert/concert.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: users_model_1.UserSchema }]),
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Reservation', schema: reservation_model_1.ReservationSchema },
            ]),
            reservation_module_1.ReservationModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Concert', schema: concert_model_1.ConcertSchema }]),
            concert_module_1.ConcertModule,
        ],
        controllers: [
            admin_controller_1.AdminController,
            users_controller_1.UsersController,
            reservation_controller_1.ReservationController,
            concert_controller_1.ConcertController,
        ],
        providers: [admin_service_1.AdminService, users_service_1.UsersService, reservation_service_1.ReservationService, concert_service_1.ConcertService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map