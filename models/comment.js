const mongoose = require('mongoose')
const commentSchema = {
    comment: String,
    commentBy: String,
    commentBy_Id: String,
    ofQuestion: String,
    idOfQuestion: String,
    repliesOfComment: {
        type: Number,
        required: false,
        default: 0
    },
    dateAdded: {
        type: String,
        required: true,
        default: Date.now
    }
}
module.exports = mongoose.model('comments', commentSchema)