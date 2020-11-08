const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const User = require('./models/users')

// Using Session Middleware
app.use(session({
    secret: "cnjenicc",
    resave: false,
    saveUninitialized: false
}))

const authenticateUser = require('./authentication/authenticate')

// Setting public folder as static
app.use(express.static('public'))

// Making connection to the database
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/forumWebsite', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', () => {
    console.log(`database connected`);
})

// Body-Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Collection for Categories
const categories = require('./models/category')
// Collection for Questions
const questions = require('./models/question')

// Setting  View Engine as EJS
app.set('view engine', 'ejs')

// Routes
app.get('/', authenticateUser, async (req, res) => {
    let authenticated = res.locals.authenticated
    let categoriess = await categories.find({})
    let questionss = await questions.find({})
    let allUsers = await User.find({})
    let user;
    if (res.locals.decoded != undefined) {
        user = await User.find({ _id: res.locals.decoded.id })
    }
    res.render('index', { title: 'HomePage', categoriess, questionss, user, authenticated: authenticated, allUsers })
})

app.use('/user', require('./routes/user'))
app.use('/category', require('./routes/category'))
app.use('/question', require('./routes/question'))

// Making our express app to listen on a port
app.listen(80, () => {
    console.log(`Connected`);
})