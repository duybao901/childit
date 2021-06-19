const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
    expressFileUpload({
        useTempFiles: true,
    }),
);

// Router
app.use('/user', require('./routes/Users.route'));
app.use('/api', require('./routes/Upload.route'));
app.use('/class', require('./routes/Class.route'));
app.use('/student', require('./routes/Student.route'));
app.use('/skill', require('./routes/Skill.route'));
app.use('/school', require('./routes/School.route'));
app.use('/grade', require('./routes/Grade.route'));
app.use('/group', require('./routes/Group.route'));

// Connect mongodb
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(
    MONGODB_URL,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log('Connected to mongodb');
    },
);

// Build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/classdojo/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/classdojo', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('App listening on PORT: ', PORT);
});

// app.get('/', (req, res) => {
//     res.send("Hello world 💔");
// })
