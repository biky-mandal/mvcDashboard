const express = require('express');
const { validate_Login_Request, validate_Signup_Request, is_Request_Validated } = require('../controllers/validation');
const { studentlogin, studentregister, studentlogout } = require('../controllers/auth');
const { teacherlogin, teacherregister, teacherlogout } = require('../controllers/t_auth');

const router = express.Router();

router.post('/student/login', validate_Login_Request, is_Request_Validated, studentlogin)
router.post('/student/register', validate_Signup_Request, is_Request_Validated, studentregister)
router.post('/student/logout', studentlogout)

router.post('/teacher/login', validate_Login_Request, is_Request_Validated, teacherlogin)
router.post('/teacher/register', validate_Signup_Request, is_Request_Validated, teacherregister)
router.post('/teacher/logout', teacherlogout)

module.exports = router;