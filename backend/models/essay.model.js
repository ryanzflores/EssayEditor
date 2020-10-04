const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const essaySchema = new Schema({
    description: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now, expires: 60*60*24*3},
    edits: [{type: mongoose.ObjectId, ref: 'Edit'}]
}, {
    timestamps: true,
});

const Essay = mongoose.model('Essay', essaySchema);

module.exports = Essay;