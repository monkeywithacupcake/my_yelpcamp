const mongoose = require('mongoose');

const campgroundSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: {
        type: String,
        required: true,
        default: 'This is the best campground.'
    },
    price: { type: String, required: true, default: "0.00" },
    author: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: { type: String }
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: true
        }
    ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
