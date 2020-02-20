const router = require('express').Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);


mongoose.connect('mongodb://localhost:27017/people',
    { useNewUrlParser: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Great success!');
        }
    });

router.get('/hello', (req, res, next) => res.send('Hello, World!'));

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
        res.send(result);
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