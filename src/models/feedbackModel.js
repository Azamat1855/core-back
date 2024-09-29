const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Auth'
    },
    teacherId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Auth'
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be between 1 and 5'],
        max: [5, 'Rating must be between 1 and 5']
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Feedback', FeedbackSchema);
