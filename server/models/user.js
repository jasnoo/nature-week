const mongoose = require("mongoose");
// add mongoose URI and connect

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    firstName: { type: String, trim: true, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Favorite" }],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
