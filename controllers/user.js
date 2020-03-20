const user = require('../models/userSchema.js');

exports.signup = (req, res) => {
    console.log(req.body);
    res.send(req.body);
    // async await
    // to be continue...
};


exports.login = (req, res) => {
    console.log(req.body);
    // to be continue...
};


exports.logout = (req, res) => {
    // to be continue...
    return res.status().send();
}