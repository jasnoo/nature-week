const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    _id: { type: Number, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    common_name: { type: String, trim: true, trim: true },
    photo_url: { type: String },
    type: { type: String, enum: ["Aves", "Fungi", "Plantae", "Insecta"] },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
