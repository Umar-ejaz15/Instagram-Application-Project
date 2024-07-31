const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    image: Buffer
})

module.exports = mongoose.model('Post', postSchema)
