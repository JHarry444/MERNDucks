const router = require('express').Router();
const { User } = require('../config/db');
const bcrypt = require('bcrypt');
const { isEmail, isEmpty } = require('validator');
const createError = require('http-errors');

router.post('/create', ({ body }, res, next) => {
    const { userName, email, password } = body;
    if (!isEmail(email)) {
        return next(createError(418, "Invalid Email Address"));
    } else if (isEmpty(userName)) {
        return next(createError(418, "Username required"));
    } else if (isEmpty(password)) {
        return next(createError(418, "Password required"));
    } else {
        const newUser = new User({ userName, email, password });

        newUser.save((error, prod) => {
            if (error) {
                next(error);
            }
            res.status(201)
                .send(`Successfully added ${prod.username}`);
        })
    }
});

router.post('/login', ({ body }, res) => {
    User.findOne({ userName: body.userName }, (error, result) => {
        if (error || !result || !bcrypt.compareSync(body.password, result.password)) {
            res.status(401).send();
        } else {
            res.send(result);
        }
    });
});

module.exports = router;