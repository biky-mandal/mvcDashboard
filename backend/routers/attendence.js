const express = require('express');
const { addAttendence } = require('../controllers/addAttendence');
const { require_Signin, check_teacher_or_Not } = require('../controllers/commonContoller');
const router = express.Router();
const Attendence = require('../dbModels/attendenceSchema');


router.get('/attendence/fetch', (req, res) => {
    Attendence.find({}).exec((error, attendence) => {
        if(error){
            return res.status(400).json({
                error
            })
        }
        if (attendence) {
            return res.status(200).json({
                attendence
            })
        }
    })
})

router.post('/attendence/add', require_Signin, check_teacher_or_Not, addAttendence);

module.exports = router