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

module.exports = {
    "Person": Person
}