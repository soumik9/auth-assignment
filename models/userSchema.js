const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    img: String,
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: String,
    address: String,
}, { timestamps: true });

const User = new mongoose.model("User", userSchema);
module.exports = User

