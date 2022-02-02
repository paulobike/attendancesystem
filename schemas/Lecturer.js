const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    courses: [String]
});

module.exports = mongoose.model('Lecturer', schema);