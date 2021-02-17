let router = require( 'express' ).Router();

const projectController = require( './projectController' );

router.get( '/', function( req, res ) {
    res.json({
        status: 'API Is Working bitch, Im sorry I didnt mean that',
        message: 'Welcome to the API'
    })
})

router.route( '/data' )
    .get( projectController.index )
    .post( projectController.new )



module.exports = router;