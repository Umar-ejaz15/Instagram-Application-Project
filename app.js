const express = require('express');
const app = express();
port = 3000;


const createERROR = require('http-errors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require("./config/mongo-connection.js")

const indexRoute = require('./routes/indexRoute');
const profileRoute = require('./routes/profileRoute');
const homeRoute = require('./routes/homeRoute.js');
const postRoute = require('./routes/postRoute');
require('dotenv').config()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false
}));

app.use("/", indexRoute)

app.use("/home", homeRoute)

app.use("/profile", profileRoute)
app.use("/post", postRoute)

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});