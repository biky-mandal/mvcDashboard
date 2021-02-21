const Student = require('../dbModels/studentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = (student, password) => {
    return bcrypt.compareSync(password, student.hashpassword);
} 

// Lets create the signup logic
exports.studentregister = (req, res) => {
    Student.findOne({ email: req.body.email }) // findOne function takes object argument
        .exec( async (error, student) => {
            // If error comes then
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // if user comes then
            if(student){
                // That means User already exist.
                return res.status(401).json({
                    message: 'Student already registered!'
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
            const _student = new Student({
                name,
                email,
                hashpassword
            });

            _student.save( (error, data) => {
                if(error){
                    return res.status(400).json({
                        error: 'Something Went wrong while saving the data to DB'
                    });
                }
                if(data){
                    return res.status(200).json({
                        message: 'Student Created Successfully..'
                    });
                }
            });
        });
}

// Lets create the login logic
exports.studentlogin = (req, res) => {
    Student.findOne({ email: req.body.email })
        .exec( (error, student) => {
            // User not found error.
            if(error){
                return res.status(400).json({
                    error
                });
            }
            // If user found then we have to proceed towards login.
            if(student){
                // Now we should check that password matched or not
                // authenticate is a method defined in userSchema to check password 
                if(authenticate(student, req.body.password)){
                    // Here we return user a token that whenever the user signs in he give us a token so that we can verify the user.
                    const token = jwt.sign({_id: student._id}, process.env.JWT_SECRET, {expiresIn:'20d'})
    
                    const {_id, name, email} = student;
                    res.cookie('token', token, { expiresIn: '20d' });
    
                    res.status(200).json({
                        token,
                        student:{
                            _id, name , email
                        }
                    });
                }
                // If pssword does not match
                else{
                    return res.status(400).json({
                        error: 'Invalid Password!'
                    });
                }
            }else{
                return res.status(400).json({
                    error: 'I must register first.'
                });
            }
        });
}

// Lets create the log out logic
exports.studentlogout = (req, res) => {
    // In the logout section we clear the cookie of token so that the user will get Logout.
    res.clearCookie('token');
    res.status(200).json({
        message: 'Logout Successfull..'
    });
}

