const express = require('express');
const router = express.Router();
const Student = require('../dbModels/studentSchema');


router.get('/student/fetch', (req, res) => {
    Student.find({}).exec((error, student) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        if (student) {
            return res.status(200).json({
                student
            })
        }
    })
})

module.exports = router