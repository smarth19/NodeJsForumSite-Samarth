const mongoose = require('mongoose')
const replySchema = {
    reply: String,
    replyBy_userName: String,
    replyBy_userId: String,
    replyOnCommentId: String,
    replyOnQuestionId: String,
    dateOnReplied: {
        type: Date,
        required: true,
        default: Date.now
    }
}
module.exports = mongoose.model('replies', replySchema)