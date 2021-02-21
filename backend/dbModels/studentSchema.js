const mongoose = require('mongoose');
// This bcrypt will used to convert a password to hash.
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({

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
    hashpassword: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);