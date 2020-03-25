const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,     
        required: true
    },
    passw: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("user", userSchema);
