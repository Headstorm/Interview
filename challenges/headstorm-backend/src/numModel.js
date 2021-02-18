//this file defines a data model

let mongoose = require( 'mongoose' );
//creates a schema for acceptable data
const numDataSchema = mongoose.Schema({
    nums: Array
});

let NumData = module.exports = mongoose.model( 'numData', numDataSchema );

module.exports.get = function( callback, limit ){
    NumData.find( callback ).limit( limit );
}
