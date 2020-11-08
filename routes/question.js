const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const questions = require('../models/question')
const User = require('../models/users')
const comment = require('../models/comment')
const reply = require('../models/reply')
const authenticateUser = require('../authentication/authenticate')

router.use(function (req, res, next) {
    if (req.query._method == 'DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next()
})

router.get('/:que', authenticateUser, async (req, res) => {
    try {
        let quest = await questions.findOne({ question: req.params.que })
        let authenticated = res.locals.authenticated
        let repliesOfCommentsOnThisQuestion = await reply.find({ replyOnQuestionId: quest._id });
        let allUsers = await User.find({})
        let commentsToTheQuestion = await comment.find({ ofQuestion: req.params.que })
        let user;
        if (res.locals.decoded != undefined) {
            user = await User.find({ _id: res.locals.decoded.id })
        }
        res.render('question', { title: req.params.que, quest, user, authenticated: authenticated, allUsers, commentsToTheQuestion, repliesOfCommentsOnThisQuestion })
    } catch (error) {
        console.log(error);
    }
})
router.post('/:que', authenticateUser, async (req, res) => {
    try {
        let user = await User.findOne({ _id: res.locals.decoded.id })
        let commentOnQuestion = await questions.findOne({ question: req.params.que })
        let updatedAnswerCount = commentOnQuestion.answers + 1
        let newComment = new comment({
            comment: req.body.comment,
            commentBy: user.name,
            commentBy_Id: res.locals.decoded.id,
            ofQuestion: req.params.que,
            idOfQuestion: commentOnQuestion._id
        })
        let savingComment = await newComment.save()
        let updatingAnswerCountOfQuestion = await questions.findOneAndUpdate({ question: req.params.que }, { answers: updatedAnswerCount })
        res.redirect(`back`)
        // res.redirect(`/question/${req.params.que}`)
    } catch (error) {
        console.log(`error ocurred: ` + error);
    }
})
router.post('/updatequestion/:quesId', authenticateUser, async (req, res)=>{
    if(res.locals.authenticated == true){
        try {
            await questions.findByIdAndUpdate({_id: req.params.quesId}, {$set: {question: req.body.editTitle, description: req.body.editDescription}})
            await comment.updateMany({idOfQuestion: req.params.quesId}, {ofQuestion: req.body.editTitle})
            let regexedquestion = req.body.editTitle.replace(/\?/g, '%3F')
            res.redirect(`/question/${regexedquestion}`)
        } catch (error) {
            console.log(`Error ocurred while updating question: ${error}`);
        }
    }
})
router.post('/comment/reply', authenticateUser, async (req, res) => {
    try {
        let Quest = await questions.findOne({ question: req.body.question })
        let loggedInUser = await User.findOne({ _id: res.locals.decoded.id })
        const replyObject = {
            reply: req.body.reply,
            replyBy_userName: loggedInUser.name,
            replyBy_userId: loggedInUser._id,
            replyOnCommentId: req.body.commentId,
            replyOnQuestionId: Quest._id
        }
        const newReply = new reply(replyObject)
        await newReply.save()
        const replyOfComment = await comment.findOne({ _id: req.body.commentId })
        const replyCountUpdate = replyOfComment.repliesOfComment + 1
        await comment.findOneAndUpdate({ _id: req.body.commentId }, { repliesOfComment: replyCountUpdate })
        res.redirect(`back`)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/:quesId', authenticateUser, async (req, res)=>{
    if (res.locals.authenticated == true) {
        try {
            await questions.findByIdAndDelete({_id: req.params.quesId})
            await comment.deleteMany({idOfQuestion: req.params.quesId})
            await reply.deleteMany({replyOnQuestionId: req.params.quesId})
            res.redirect('/')
        } catch (error) {
            console.log(`Error Ocuured: ${error}`);
        }
    }
})

router.delete('/:replyId', authenticateUser, async (req, res) => {
    if (res.locals.authenticated == true) {
        try {
            let replyToDelete = await reply.findOne({ _id: req.params.replyId })
            let replyOnComment = await comment.findOne({ _id: replyToDelete.replyOnCommentId })
            let decreaseReplyCount = replyOnComment.repliesOfComment - 1
            await comment.findByIdAndUpdate({ _id: replyToDelete.replyOnCommentId }, { repliesOfComment: decreaseReplyCount })
            await reply.findByIdAndDelete({ _id: req.params.replyId })
            res.redirect('back')
        } catch (error) {
            res.redirect('back')
        }
    } else {
        res.redirect('back')
    }

})

router.delete('/comment/:comment_id', authenticateUser, async (req, res) => {
    if (res.locals.authenticated == true) {
        try {
            let commentToDelete = await comment.findById({ _id: req.params.comment_id })
            let commentOfQuestion = await questions.findById({ _id: commentToDelete.idOfQuestion })
            let decreaseAnswerCount = commentOfQuestion.answers - 1
            await questions.findByIdAndUpdate({ _id: commentToDelete.idOfQuestion }, { answers: decreaseAnswerCount })
            await reply.deleteMany({ replyOnCommentId: req.params.comment_id })
            await comment.findByIdAndDelete({ _id: req.params.comment_id })
            res.redirect('back')
        } catch (error) {
            res.redirect('back')
        }
    } else {
        res.redirect('back')
    }
})

router.post('/updatereply/:replyId', authenticateUser, async (req, res) => {
    if (res.locals.authenticated == true) {
        try {
            await reply.findByIdAndUpdate({ _id: req.params.replyId }, {reply: req.body.reply})
            res.redirect('back')
        } catch (error) {
            console.log(`error occurred ${error}`);
        }

    }
})
router.post('/updatecomment/:commentId', authenticateUser, async (req, res) => {
    if (res.locals.authenticated == true) {
        try {
            await comment.findByIdAndUpdate({ _id: req.params.commentId }, {comment: req.body.comment})
            res.redirect('back')
        } catch (error) {
            console.log(`error occurred ${error}`);
        }

    }
})

module.exports = router

