exports.userDataValidator = (req, res, next) => {
    // name
    req.check('name', 'Input a name').notEmpty();
    req.check('name', 'Name should be min 3 and max 20 characters').isLength({
        min: 3,
        max: 20
    });

    // password
    req.check('passw', 'Input a password').notEmpty();
    req.check('passw', 'Password should be min 5 and max 20 characters').isLength({
        min: 5,
        max: 20
    });

    //check for errors
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
};