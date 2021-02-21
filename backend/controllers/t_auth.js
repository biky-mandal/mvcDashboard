const Teacher  = require('../dbModels/teacherSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// This function will compare bcrypt password and return true or false.
const authenticate = (teacher, password) => {
    return bcrypt.compareSync(password, teacher.hashpassword);
} 
// Lets create the signup logic
exports.teacherregister = (req, res) => {
    Teacher.findOne({ email: req.body.email }) // findOne function takes object argument
        .exec( async (error, teacher) => {
            // If error comes then
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // if user comes then
            if(teacher){
                // That means User already exist.
                return res.status(401).json({
                    message: 'Teacher already registered!'
                });
            }

            // If None of the above occures that means now we have to create a new acount.
            const {
                name,
                email,
                password
            } = req.body;

            // Before save our data to DB we convert our plain password to
            // hash_password using bcrypt.
            const hashpassword = await bcrypt.hash(password, 10); // here 10 is the salt that is maximum value measure strenth

            // creating a new user
            const _teacher = new Teacher({
                name,
                email,
                hashpassword,
                role: 'teacher'
            });

            _teacher.save( (error, data) => {
                if(error){
                    return res.status(400).json({
                        error: 'Something Went wrong while saving the data to DB'
                    });
                }
                if(data){
                    return res.status(200).json({
                        message: 'Teacher Created Successfully..'
                    });
                }
            });
        });
}

// Lets create the login logic
exports.teacherlogin = (req, res) => {
    Teacher.findOne({ email: req.body.email })
        .exec( (error, teacher) => {
            // User not found error.
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // If user found then we have to proceed towards login.
            if(teacher){
                // Now we should check that password matched or not
                // authenticate is a method defined in userSchema to check password 
                if(authenticate(teacher,req.body.password) && teacher.role === 'teacher'){
                    // Here we return user a token that whenever the user signs in he give us a token so that we can verify the user.
                    const token = jwt.sign({_id: teacher._id, role: teacher.role}, process.env.JWT_SECRET, {expiresIn:'20d'})
    
                    const {_id, name, email, role,} = teacher;
                    res.cookie('token', token, { expiresIn: '20d' });
    
                    res.status(200).json({
                        token,
                        teacher:{
                            _id, name, email, role
                        }
                    });
                }
                // If pssword does not match
                else{
                    return res.status(400).json({
                        message: 'Invalid Password!'
                    });
                }
            }else{
                return res.status(400).json({
                    message: 'I must register first.'
                });
            }
        });
}

// Lets create the log out logic
exports.teacherlogout = (req, res) => {
    // In the logout section we clear the cookie of token so that the user will get Logout.
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successfull..'
    });
}
