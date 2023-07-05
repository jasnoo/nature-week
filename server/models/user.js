const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    first_name: { type: String, trim: true, required: true },
    favorites: { type: [Number], required: true, default: [] }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
