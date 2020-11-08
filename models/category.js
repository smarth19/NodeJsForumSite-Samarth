const mongoose = require('mongoose')

// Collection for Categories
const CategorySchema = new mongoose.Schema({
    categoryName: String
})
module.exports = mongoose.model('categories', CategorySchema)