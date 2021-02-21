const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
    studentId: {type: String},
    _day: {type: String},
    
}, {timestamps: true});

module.exports = mongoose.model('Attendence', attendenceSchema);