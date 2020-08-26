const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const essaySchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Essay = mongoose.model('Essay', essaySchema);

module.exports = Essay;