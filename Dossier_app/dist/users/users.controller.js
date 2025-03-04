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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getRegister() { }
    getLogin() { }
    getUser_profile() { }
    async getProfile(userId, res) {
        const user = await this.usersService.getSingleUser(userId);
        return res.render('user_profile', user);
    }
    async addUser(userName, userEmail, userPassword, userConfirm, userNumber, isAdmin, res) {
        if (userName == undefined ||
            userEmail == undefined ||
            userPassword == undefined ||
            userConfirm == undefined ||
            userNumber == undefined) {
            return res.render('register', {
                message: 'veuillez remplir tous les champs',
            });
        }
        if (userName.length < 3) {
            return res.render('register', {
                message: 'veuillez entrer un nom superieur ou egale à 3',
            });
        }
        if (userNumber.length < 10) {
            return res.render('register', {
                message: 'Entrez un numéro valide',
            });
        }
        if (userPassword.length < 8) {
            return res.render('register', {
                message: 'Le mot de passe ne peut avoir en dessous de 8 caractère',
            });
        }
        if (userPassword != userConfirm) {
            return res.render('register', {
                message: 'Mot de passe non conforme',
            });
        }
        await this.usersService.insertUser(userName, userEmail, userPassword, userNumber, isAdmin);
        return { url: 'login' };
    }
    getAllUsers() {
        return this.usersService.getUsers();
    }
    getUser(userEmail) {
        return this.usersService.getSingleUser(userEmail);
    }
    async connectuser(userEmail, userPassword, session, res) {
        const user = await this.usersService.findUsers(userEmail);
        if (user) {
            const hash = user?.password;
            const hashed = await bcrypt.compare(userPassword, hash);
            if (hashed) {
                session.isAdmin = user?.isAdmin;
                session.user = user?._id;
                session.connected = true;
                return { url: '/' };
            }
            else {
                return res.render('login', {
                    message: 'Mot de passe non conforme',
                });
            }
        }
        else {
            return res.render('login', {
                message: "utilsateur n'existe pas, inscrivez-vous",
            });
        }
    }
    cookie(request, response) {
        console.log(request.cookies);
        response.cookie('key', 'value');
    }
    async logout(res) {
        res.clearCookie('connect.sid');
        res.redirect('/');
    }
    async updateUser(userId, userUserName, userEmail, userPassword, userNUmber, isAdmin) {
        const updatedUser = await this.usersService.updateUser(userId, userUserName, userEmail, userPassword, userNUmber, isAdmin);
        return { message: 'User updated successfully', updatedUser };
    }
    async removeUser(userId) {
        await this.usersService.deleteUser(userId);
        return { message: 'User deleted successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Render)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getRegister", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Get)('user_profile'),
    (0, common_1.Render)('user_profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser_profile", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __param(3, (0, common_1.Body)('password_confirm')),
    __param(4, (0, common_1.Body)('number')),
    __param(5, (0, common_1.Param)('isAdmin')),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('/Users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Session)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "connectuser", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "cookie", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userName')),
    __param(2, (0, common_1.Body)('email')),
    __param(3, (0, common_1.Body)('password')),
    __param(4, (0, common_1.Body)('number')),
    __param(5, (0, common_1.Body)('isAdmin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map