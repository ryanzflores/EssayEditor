const router = require('express').Router();
const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;
let Essay = require('../models/essay.model');
let Edit = require('../models/edit.model');

router.route('/').get((req, res) => {
    Essay.find()
        .then(essays => res.json(essays))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Essay.findById(req.params.id)
        .then(essay => res.json(essay))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const content = req.body.content;
    const date = Date.parse(req.body.date);

    const newEssay = new Essay({
        username,
        description,
        content,
        date
    });

    let id = '';

    newEssay.save()
        .then((essay) => res.json(essay._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Essay.findByIdAndDelete(req.params.id)
        .then(() => res.json('Essay deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Essay.findById(req.params.id)
        .then(essay => {
            essay.username = req.body.username;
            essay.description = req.body.description;
            essay.content = req.body.content;
            essay.date = Date.parse(req.body.date);

            essay.save()
                .then(() => res.json('Essay updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const message = req.body.message;

    const edit = new Edit({
        start,
        end,
        message
    });

    Essay.findById(req.params.id)
        .then(essay => {
            edit.save()
                .then((newEdit) => {Essay.findOneAndUpdate(
                    {_id: essay._id},
                    {$push: {edits: edit._id}},
                    {new: true}
                ).then(() => res.json('Essay edited!'))
                    .catch(err => res.status(400).json('Error: ' + err))
                });
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/edits/:id').get((req, res) => {
    Essay.findById(req.params.id)
        .then(async function(essay) {
            Edit.find({
                '_id': { $in: essay.edits}
            })
                .then(edits => res.json(edits))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;