const User = require('../models/userSchema.js');

const checkToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: 'Token not provided!'
        })
    }
    User.findOne({
            token: token
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'Invalid token!'
                })
            }
            req.userId = user._id;
            return next();
        })
        .catch(err => res.status(500).json({
            message: 'Some error'
        }));
}

module.exports.checkToken = checkToken;