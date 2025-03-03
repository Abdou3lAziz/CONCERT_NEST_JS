"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcertSchema = void 0;
const mongoose = require("mongoose");
exports.ConcertSchema = new mongoose.Schema({
    titre: { type: String },
    artiste: { type: String },
    date: { type: String },
    lieu: { type: String },
    montant: { type: Number },
    image: { type: String },
    created_at: { type: Date },
});
//# sourceMappingURL=concert.model.js.map