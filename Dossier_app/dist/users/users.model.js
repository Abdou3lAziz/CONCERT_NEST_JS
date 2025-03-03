"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    number: { type: String },
    isAdmin: { type: Boolean, default: false },
});
//# sourceMappingURL=users.model.js.map