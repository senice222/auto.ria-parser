const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    parsed: {
        type: [],
        default: []
    },
    parsedCount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;