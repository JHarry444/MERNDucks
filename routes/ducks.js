const router = require('express').Router();
const { Duck } = require('../config/db');
const { merge } = require('lodash');

router.get('/getAll', (req, res, next) => {
    Duck.find((error, result) => {
        if (error) {
            next(error);
        } else {
            res.send(result);
        }
    });
});

router.get('/get/:id', (req, res, next) => {
    Duck.findById(req.params.id, (error, result) => {
        if (error) {
            next(error);
        } else {
            res.send(result);
        }
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Duck.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) {
            next(error);
        } else {
            res.status(204).send(result);
        }
    });
});

router.post('/create', ({ body }, res, next) => {
    const duck = new Duck(body);
    duck.save().then((result) => {
        res.status(201).send(`${result.name} added successfully`);
    }).catch(err => next(err));
});

router.put('/replace/:id', (req, res, next) => {
    const duck = Duck.findById(req.params.id);
    duck.name = req.query.name;
    duck.dob = req.query.dob;
    duck.save().then(result => {
        res.status(202).send(`${id} successfully replaced`);
    }).catch(error => {
        next(error);
    })
});

router.patch('/update/:id', function (req, res, next) {
    Duck.findById(req.params.id, (error, duck) => {
        if (error) {
            return next(error);
        }
        merge(duck, req.params);
        duck.save((error) => {
            if (error) {
                next(error);
            } else {
                res.send(result);
            }
        });
    });
});

module.exports = router;