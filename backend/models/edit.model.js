const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editSchema = new Schema({
    username: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;