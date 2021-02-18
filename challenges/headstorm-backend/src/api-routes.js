//declares router as middleware to modularize api requests
let router = require( 'express' ).Router();

//imports a custom controller for utilizing data 
const dataController = require( './dataController' );

//sets default api route to show a success message
router.get( '/', function( req, res ) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome to the API'
    })
})
//defines a /data route
router.route( '/data' )
    .get( dataController.index )
    .post( dataController.new )
    .patch(dataController.patch)


module.exports = router;