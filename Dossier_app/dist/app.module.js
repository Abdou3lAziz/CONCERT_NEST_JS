"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const session_check_middleware_1 = require("./middleware/session-check.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const concert_module_1 = require("./concert/concert.module");
const home_module_1 = require("./home/home.module");
const platform_express_1 = require("@nestjs/platform-express");
const mailer_1 = require("@nestjs-modules/mailer");
const admin_module_1 = require("./admin/admin.module");
const reservation_module_1 = require("./reservation/reservation.module");
const admin_controller_1 = require("./admin/admin.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(session_check_middleware_1.AdminMiddleware)
            .forRoutes({ path: 'concert', method: common_1.RequestMethod.ALL });
        consumer.apply(session_check_middleware_1.AdminMiddleware).forRoutes(admin_controller_1.AdminController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            concert_module_1.ConcertModule,
            users_module_1.UsersModule,
            home_module_1.HomeModule,
            reservation_module_1.ReservationModule,
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://username:A5RZBXFLsCZ9vU36@cluster0.ldq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
            }),
            admin_module_1.AdminModule,
            reservation_module_1.ReservationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map