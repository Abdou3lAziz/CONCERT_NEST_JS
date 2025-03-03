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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const reservation_service_1 = require("../reservation/reservation.service");
const concert_service_1 = require("../concert/concert.service");
let AdminController = class AdminController {
    UsersService;
    reservationService;
    ConcertService;
    constructor(UsersService, reservationService, ConcertService) {
        this.UsersService = UsersService;
        this.reservationService = reservationService;
        this.ConcertService = ConcertService;
    }
    getRegister() { }
    async root() {
        const GetUsers = await this.UsersService.getUsers();
        const number = await this.UsersService.getUsersNumber();
        const numbers = await this.reservationService.getReservNumbers();
        const numb = await this.ConcertService.getConcertNumber();
        return {
            AllUsers: GetUsers,
            Numbre: number,
            Numbres: numbers,
            numbs: numb,
        };
    }
    async createUsers(userName, userEmail, userPassword, userConfirm, userNumber, isAdmin, res) {
        if (userName == undefined ||
            userEmail == undefined ||
            userPassword == undefined ||
            userConfirm == undefined ||
            userNumber == undefined ||
            userNumber == undefined) {
            return res.render('createUser', {
                message: 'veuillez remplir tous les champs',
            });
        }
        if (userName.length < 3) {
            return res.render('createUser', {
                message: 'veuillez entrer un nom superieur ou egale à 3',
            });
        }
        if (userNumber.length < 10) {
            return res.render('createUser', {
                message: 'Entrez un numéro valide',
            });
        }
        if (userPassword.length < 8) {
            return res.render('createUser', {
                message: 'Le mot de passe ne peut avoir en dessous de 8 caractère',
            });
        }
        if (userPassword != userConfirm) {
            return res.render('createUser', {
                message: 'Mot de passe non conforme',
            });
        }
        const respo = await this.UsersService.insertUser(userName, userEmail, userPassword, userNumber, isAdmin);
        console.log(respo);
        return { url: 'dashboard' };
    }
    async findAll() {
        const users = await this.UsersService.getUsers();
        return users;
    }
    async findOne(id) {
        const user = await this.UsersService.getSingleUser(id);
        console.log(user);
        return user;
    }
    async updateUser(id, userName, userEmail, userPassword, userNumber, isAdmin, res) {
        const updateResult = await this.UsersService.updateUser(id, userName, userEmail, userPassword, userNumber, isAdmin);
        if (!updateResult) {
            return res.render('error', {
                message: 'update failed',
            });
        }
        console.log(userName, isAdmin);
        console.log(updateResult);
        return updateResult;
    }
    async removeUser(id) {
        await this.UsersService.deleteUser(id);
        return { url: '/admin/dashboard' };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('createUser'),
    (0, common_1.Render)('createUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getRegister", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.Render)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "root", null);
__decorate([
    (0, common_1.Post)('createUser'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Body)('password_confirm')),
    __param(4, (0, common_1.Body)('number')),
    __param(5, (0, common_1.Body)('isAdmin')),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('password')),
    __param(4, (0, common_1.Body)('number')),
    __param(5, (0, common_1.Body)('isAdmin')),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeUser", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        reservation_service_1.ReservationService,
        concert_service_1.ConcertService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map