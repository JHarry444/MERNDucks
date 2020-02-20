const router = require('express').Router();
const { User } = require('../db');
const bcrypt = require('bcrypt');
const validator = require('validator');

router.post('/create', ({ body }, res, next) => {
    const { userName, email, password } = body;

    if (!validator.isEmail(email)) {
        
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