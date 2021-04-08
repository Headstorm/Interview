const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Data = require('../models/number');

router.get('/', (req, res, next) => {
    Data.find()
    .select('data _id')
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:dataId', (req, res, next) => {
    const id = req.params.dataId;
    Data.findById(id)
    .select('data _id')
    .exec()
    .then(doc => {
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "No valid entry for provided ID"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


router.post('/', (req, res, next) => {
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        data: req.body.data
    });
    console.log(data.data.length);
    if(data.data.length === 500){
        data.save()
        .then(result => {
            console.log(result);
            console.log(result.data.length);
            
            res.status(201).json({
                message: 'Data created',
                created: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/data/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } else {
        res.status(500).json({
            error: 'Object list is not 500 objects in length'
        });
    }
    
});

router.patch('/:dataId', (req, res, next) => {
    const id = req.params.dataId;
    if(req.body.data.length === 500) {
        Data.updateOne({_id: id }, {$set: {data: req.body.data}})
            .exec()
            .then(doc => {
                console.log(doc);
                res.status(200).json({
                    data: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/data/' + id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(500).json({
            error: 'Object list is not 500 objects in length OR data is invalid'
        });
    }
});

module.exports = router;