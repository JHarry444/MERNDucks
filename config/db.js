const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { dbUrl, peopleDb } = require('./config.json');
const bcrypt = require('bcrypt');

const duckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

const Duck = model('Duck', duckSchema);

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: function (pass) {
            const hash = bcrypt.hashSync(pass, 12);
            return hash;
        }
    }
})

const User = model('User', userSchema);

mongoose.connect(`mongodb://${dbUrl}/${peopleDb}`,
    { useNewUrlParser: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Great success!');
        }
    });

module.exports = {
    Duck,
    User
}