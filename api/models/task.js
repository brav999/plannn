const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalTime: {
        type: Number,
        default: 0
    },
    startTime: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Task', taskSchema);
