'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const numbersSchema = new Schema({
  numbers: {type: [Number], required: true, default: undefined}
});

numbersSchema.method('serialize', function () {
  return {
    id: this._id
  }
});

exports.Numbers = mongoose.model('Numbers', numbersSchema, 'numbers');