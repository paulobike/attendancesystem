const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: {type: Date, default: () => { return new Date() }},
    course: String,
    classCount: Number,
    title: String,
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
});

module.exports = mongoose.model('Class', schema);