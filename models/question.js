const mongoose = require('mongoose')

// Collection for Questions
const questionsSchema = new mongoose.Schema({
    question: String,
    description: String,
    cat_Id: String,
    postedBy: String,
    answers: {
        type: Number,
        required: false,
        default: 0
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('questions', questionsSchema)