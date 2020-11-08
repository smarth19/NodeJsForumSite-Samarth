const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const categories = require('../models/category')
const questions = require('../models/question')
const User = require('../models/users')
const authenticateUser = require('../authentication/authenticate')
const comment = require('../models/comment')

router.get('/:category', authenticateUser, async (req, res) => {
    let authenticated = res.locals.authenticated
    let cat = await categories.find({ categoryName: req.params.category })
    let categoryQuestions = await questions.find({ cat_Id: cat[0]._id })
    let allUsers = await User.find({})
    let user;
    if (res.locals.decoded != undefined) {
        user = await User.find({ _id: res.locals.decoded.id })
    }
    res.render('category', { title: req.params.category, cat, categoryQuestions, user, authenticated: authenticated, allUsers })
})

// Asking a New Question on Category Route
router.post('/:category', authenticateUser, async (req, res) => {
        try {
        let cat = await categories.find({ categoryName: req.params.category })
        let user = await User.find({ _id: res.locals.decoded.id })
        let question = {
            question: req.body.title,
            description: req.body.description,
            cat_Id: cat[0]._id,
            postedBy: user[0]._id
        }
        let newQuestion = new questions(question)
        let saveQuestion = await newQuestion.save()
        res.redirect(`/category/${req.params.category}`)
    } catch(error){
        console.log(`Question couldn't be saved please try again due to: ${error}`);
    }

})

module.exports = router