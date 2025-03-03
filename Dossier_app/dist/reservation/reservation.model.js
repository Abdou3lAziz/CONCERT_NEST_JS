"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationSchema = void 0;
const mongoose = require("mongoose");
exports.ReservationSchema = new mongoose.Schema({
    titre: { type: String },
    date: { type: String },
    lieu: { type: String },
    montant: { type: Number },
    email: { type: String },
    created_at: { type: String },
});
//# sourceMappingURL=reservation.model.js.map