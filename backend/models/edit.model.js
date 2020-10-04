const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editSchema = new Schema({
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now, expires: 60*60*24*3}
}, {
    timestamps: true,
});

const Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;