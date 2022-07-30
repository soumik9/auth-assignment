const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: [true, 'Please enter email address!'], trim: true },
    password: { type: String, required: [true, 'Please enter password!'] },
}, { timestamps: true });

const User = new mongoose.model("User", userSchema);
module.exports = User

