const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: String,
    fullname: String,
    username: String,
    password: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})
module.exports = mongoose.model('User', userSchema)
