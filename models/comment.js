const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    // campground: { type: mongoose.Schema.Types.ObjectId, ref: 'Campground', required: true },
    text: { type: String, required: true },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: { type: String }
    },
    created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', commentSchema);
