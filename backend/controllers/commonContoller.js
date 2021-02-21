const jwt = require('jsonwebtoken');

// Logged in user profile Page

exports.require_Signin = (req, res, next) => {
    if(req.headers.authorization){
        // We grab the token in token var
        const token = req.headers.authorization.split(' ')[1];
        // Let's verify the token by decoding it.
        const teacher = jwt.verify(token, process.env.JWT_SECRET);
        // We should attach the user so that the next function will use it.
        req.teacher = teacher;
    }else{
        res.status(400).json({
            message: 'Authorization Required!'
        });
    }
    next()
}

// check admin or not
exports.check_teacher_or_Not = (req, res, next) => {
    if(req.teacher.role !== 'teacher'){
        return res.status(400).json({
            message: "teacher Access Denied.!"
        });
    }
    next();
}