const { Duck } = require('../config/db');
const { merge } = require('lodash');

const duckService = {
    getAll: (req, res, next) => {
        Duck.find((error, result) => {
            if (error) {
                next(error);
            } else {
                res.send(result);
            }
        });
    },

    get: (req, res, next) => {
        Duck.findById(req.params.id, (error, result) => {
            if (error) {
                next(error);
            } else {
                res.send(result);
            }
        });
    },

    remove: (req, res, next) => {
        Duck.findByIdAndDelete(req.params.id, (error, result) => {
            if (error) {
                next(error);
            } else {
                res.status(204).send(result);
            }
        });
    },

    create: ({ body }, res, next) => {
        const duck = new Duck(body);
        duck.save().then((result) => {
            res.status(201).send(`${result.name} added successfully`);
        }).catch(err => next(err));
    },

    replace: (req, res, next) => {
        const duck = Duck.findById(req.params.id);
        duck.name = req.query.name;
        duck.dob = req.query.dob;
        duck.save().then(result => {
            res.status(202).send(`${id} successfully replaced`);
        }).catch(error => {
            next(error);
        })
    },
    update: function (req, res, next) {
        Duck.findById(req.params.id, (error, result) => {
            if (error || !result) {
                return next(error);
            }
            merge(result, req.query);
            result.save()
                .then(result => res.send(result))
                .catch(err => next(err));
        });
    }
}

module.exports = duckService;