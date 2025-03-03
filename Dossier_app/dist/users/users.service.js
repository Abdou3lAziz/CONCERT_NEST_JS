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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async insertUser(username, email, password, number, isAdmin) {
        const outil = 10;
        const hashpassword = await bcrypt.hash(password, outil);
        const newUser = new this.userModel({
            username: username,
            email: email,
            password: hashpassword,
            number: number,
            isAdmin: isAdmin,
        });
        const result = await newUser.save();
        return result.id;
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        const count = await this.userModel.countDocuments();
        console.log(count);
        return users.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            number: user.number,
            isAdmin: user.isAdmin,
        }));
    }
    async getUsersNumber() {
        const count = await this.userModel.countDocuments();
        return count;
    }
    async getSingleUser(userId) {
        const user = await this.findUser(userId);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            number: user.number,
            isAdmin: user.isAdmin,
        };
    }
    async findUsers(email) {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }
    async updateUser(userId, username, email, password, number, isAdmin) {
        const updatedUser = await this.findUser(userId);
        if (username) {
            updatedUser.username = username;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (password) {
            updatedUser.password = password;
        }
        if (number) {
            updatedUser.number = number;
        }
        if (isAdmin != null) {
            updatedUser.isAdmin = isAdmin;
        }
        const savedUser = await updatedUser.save();
        return savedUser;
    }
    async deleteUser(userId) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find user.');
        }
    }
    async findUser(id) {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        }
        catch (err) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        if (!user) {
            throw new common_1.NotFoundException('Could not find user.');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map