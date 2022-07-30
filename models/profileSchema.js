const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    name: String,
    address: String,
    mobile: String,
    img: String,
});

const UserProfile = new mongoose.model("UserProfile", profileSchema);
module.exports = UserProfile

