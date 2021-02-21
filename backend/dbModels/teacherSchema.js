const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String
    },
    hashpassword: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Teacher', teacherSchema);