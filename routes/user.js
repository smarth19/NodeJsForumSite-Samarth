const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const User = require('../models/users')
const authenticateUser = require('../authentication/authenticate')

router.get('/login', authenticateUser, async (req, res) => {
    if (typeof res.locals.authenticated != undefined && res.locals.authenticated == true) {
        return res.redirect('/')
    }
    res.render('signin', { authenticated: res.locals.authenticated })
})

router.post('/login', authenticateUser, async (req, res) => {
    let userData = await User.find({ email: req.body.email })
    if (userData.length === 1) {
        let validatePass = await bcrypt.compare(req.body.password, userData[0].password)
        if (validatePass) {
            let token = jwt.sign({ id: userData[0]._id }, ';M.4]?4%v/k9={6g')
            req.session.loginToken = token
            return res.redirect('back')
        } else {
            return res.render('signin', { warn: 'You Entered a Wrong Password' })
        }
    } else {
        return res.render('signin', { warn: `We dont have any user with the email id: ${req.body.email}` })
    }
})

router.get('/signup', authenticateUser, async (req, res) => {
    if (typeof res.locals.authenticated != undefined && res.locals.authenticated == true) {
        res.redirect('/')
    } else {
        res.render('signup', { alert: ``, authenticated: res.locals.authenticated })
    }
})
router.post('/signup', async (req, res) => {
    let alreadyRegistered = await User.find({ email: req.body.email })
    if (alreadyRegistered.length == 0) {
        let hashedPass = await bcrypt.hash(req.body.password, 10)
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        await newUser.save()
        res.render('signup', { alert: `You've been successfuly signed up`, authenticated: res.locals.authenticated })
    } else {
        res.render('signup', { alert: `E-mail Id is already registered with us`, authenticated: res.locals.authenticated })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.redirect('/')
        } else {
            res.redirect('/user/login')
        }
    })
})

module.exports = router