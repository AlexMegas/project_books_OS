const User = require('../models/userSchema.js');
const randomToken = require('random-token')
    .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const bCrypt = require('bcrypt');


exports.signup = (req, res) => {
    const {
        name,
        passw
    } = req.body;
    User.findOne({
            name: name
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    user: user.name,
                    message: 'already exist'
                });
            }
            return bCrypt.hash(passw, 10);
        })
        .then((hash) => {
            const user = new User({
                name,
                passw: hash
            });
            return user.save();
        })
        .then((user) => res.status(200).json({
            user: user.name,
            message: 'registered'
        }))
        .catch((err) => console.error(err))
};


exports.login = (req, res) => {
    const {
        name,
        passw
    } = req.body;
    User.findOne({
            name: name
        })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            return bCrypt.compare(passw, user.passw);
        })
        .then((result) => {
            if (!result) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const token = randomToken(24);
            return User.findOneAndUpdate({
                name
            }, {
                token: token
            }, {
                new: true
            });
        })
        .then((user) => res.status(200).json({
            message: 'User logged in',
            token: user.token
        }))
        .catch((err) => console.error(err))
};


exports.logout = (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: 'Token not provided!'
        })
    }
    User.findOneAndUpdate({
            token: token
        }, {
            token: null
        })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: 'Invalid token!'
                })
            }
            res.status(200).json({
                message: 'User logged out.'
            })
        })
        .catch((err) => console.error(err))
}