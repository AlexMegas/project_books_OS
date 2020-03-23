const User = require('../models/userSchema.js');
const randomToken = require('random-token')
    .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const bCrypt = require('bcrypt');


exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        if (await User.findOne({ name: req.body.name }) === null) {
            bCrypt.hash(req.body.passw, 10, (err, hash) => {
                user.passw = hash;
                user.save()
                    .then(() => {
                        res.status(200).send(`User: "${req.body.name}" - registered :)`);
                    })
            })
        } else {
            return res.status(400).send(`User name "${req.body.name}" already exist :(`); // 400 == Bad request
        }
    } catch (err) {
        console.error(err);
    }
};


exports.login = (req, res) => {
    User.findOne({ name: req.body.name })
        .then((user) => {
            if (!user) {
                res.redirect('/');
            } else {
                bCrypt.compare(req.body.passw, user.passw, (err, result) => {
                    if (result) {
                        //token ?
                        res.status(200).send('User logged in ;)');
                    } else {
                        res.status(404).send('Invalid credentials :(');
                    }
                });
            }
        });
}


exports.logout = (req, res) => {
    return res.status(200).send('User logged out :)');
}