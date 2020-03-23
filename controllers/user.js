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

    const token = randomToken(24);
    const user = new User(req.body);

    User.findOne({ name: req.body.name })
        .then(
            bCrypt.hash(req.body.passw, 10, (err, hash) => {
                console.log(hash)
                if (hash === user.passw) {
                    res.status(200).send('User logged in ;)');
                }
            })
        )
        .catch(err => console.error(err));
}



// exports.login = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         if (await User.findOne({ name: req.body.name, passw: req.body.passw })) {
//             res.status(200).send("User logged in ;)");
//         } else {
//             return res.status(404).send("Name or password are incorrect :(");
//         }
//     } catch (err) {
//         console.error(err);
//     }
// };


exports.logout = (req, res) => {
    return res.status(200).send('User logged out :)');
}