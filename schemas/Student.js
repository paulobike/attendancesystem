const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    regNumber: String,
    password: String,
    sex: {type: String, enum: ['male', 'female']},
});

module.exports = mongoose.model('Student', schema);