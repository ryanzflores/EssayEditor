const router = require('express').Router();
let Essay = require('../models/essay.model');

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
    const content = req.body.content;
    const date = Date.parse(req.body.date);


    const newEssay = new Essay({
        username,
        content,
        date,
    });

    newEssay.save()
        .then(() => res.json('Essay added!'))
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
            essay.content = req.body.content;
            essay.date = Date.parse(req.body.date);

            essay.save()
                .then(() => res.json('Essay updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;