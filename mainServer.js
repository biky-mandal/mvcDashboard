const express = require('express');
const app = express();

const env = require('dotenv');
env.config();

app.use(express.json());

const favicon = require('express-favicon');
const path = require('path');

const mongoose = require('mongoose');
const db_url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.eslmv.gcp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect( db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Database Connected Succesfully.")
})

const cors = require('cors');
app.use(cors());

// Importing routes for student
const studentAuthRoutes = require('./backend/routers/auth');
const fetchStudent = require('./backend/routers/fetch');
const fetchAttendence = require('./backend/routers/attendence');


// For Student
app.use('/api', studentAuthRoutes);
app.use('/api', fetchStudent);
app.use('/api',fetchAttendence);


app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));  
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})