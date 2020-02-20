const router = require('express').Router();
const { Person } = require('../db');

router.get('/hello', (req, res) => res.send('Hello, World!'));

router.get('/getAll', (req, res, next) => {
    Person.find((error, result) => {
        if (error) {
            next(error);
        }
        res.send(result);
    });
});

router.get('/get/:id', (req, res, next) => {
    Person.findById(req.params.id, (error, result) => {
        if (error) {
            next(error);
        }
        res.send(result);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) {
            next(error);
        }
        res.status(204).send(result);
    });
});

router.post('/create', ({ body }, res, next) => {
    const person = new Person(body);
    person.save((error) => {
        if (error) {
            next(error);
        }
        res.status(201).send(`${body.name} added successfully`);
    })
});

router.put('/replace/:id', (req, res, next) => {
    const person = Person.findById(req.params.id);
    person.name = req.query.name;
    person.dob = req.query.dob;
    person.save().then(result => {
        res.status(202).send(`${id} successfully replaced`);
    }).catch(error => {
        next(error);
    })
});

router.patch('/update/:id', (req, res, next) => {
    Person.findById(req.params.id, (error, result) => {
        if (error) {
            next(error);
        }
        const person = result;
        person.name = req.query.name;
        person.dob = req.query.dob;
        person.save((error) => {
            if (error) {
                next(error);
            }
            res.status(202).send(`Successfully replaced`);
        });
    });

});

module.exports = router;