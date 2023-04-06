const mongoose = require('mongoose');
// add mongoose URI and connect


const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],

})
userSchema.pre('save', function (next) {
    if (this.password) {
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next();
})

const User = mongoose.model('User', userSchema)



const favoriteSchema = new Schema({
    _id: Number,
    name: { type: String, required: true },
    common_name: String,
    photo_url: { type: String, required: true },
    type: { type: String, enum: ['Aves', 'Fungi', 'Plantae'] },
    count: { type: Number, default: 0 }
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { User, Favorite };