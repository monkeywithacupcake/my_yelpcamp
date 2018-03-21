const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, uniqe: true, required: true },
    username: { type: String, required: true },
    password: { type: String },
    isAdmin: { type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
