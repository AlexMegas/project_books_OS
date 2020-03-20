const mongoose = require('mongoose');
//const crypto = require('crypto');
//const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        dropDups: true
    },
    passw: {
        type: String,
        required: true
    }
    //hash: String,
    //salt: String
});

module.exports = mongoose.model("user", userSchema);
