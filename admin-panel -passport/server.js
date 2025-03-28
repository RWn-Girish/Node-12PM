const express = require('express');
const port = 5000;
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/dbConnection');
const session = require('express-session');
const passport = require('passport');
const localSt = require("./config/passportStr");

const app = express();

// middleware
app.set("view engine", 'ejs');
app.use("/", express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(express.urlencoded());

app.use(session({
    name: 'test',
    secret: 'admin',
    resave:true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticateUser);

// routes
app.use("/", require('./routes/index.routes'));


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}`);
})