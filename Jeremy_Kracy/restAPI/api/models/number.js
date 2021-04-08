const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: [{type: Number, required: true }]
});

module.exports = mongoose.model('Data', dataSchema);