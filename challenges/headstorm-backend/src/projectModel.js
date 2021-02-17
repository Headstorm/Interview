let mongoose = require( 'mongoose' );

const projectSchema = mongoose.Schema({
    nums: Array
});

let Project = module.exports = mongoose.model( 'project', projectSchema );
module.exports.get = function( callback, limit ){
    Project.find( callback ).limit( limit );
}
