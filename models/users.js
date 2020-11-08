const mongoose = require('mongoose')
// Collection for Categories
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('users', userSchema)