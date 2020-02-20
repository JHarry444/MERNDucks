const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbUrl, peopleDb } = require('./consts.json');

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


mongoose.connect(`mongodb://${dbUrl}/${peopleDb}`,
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