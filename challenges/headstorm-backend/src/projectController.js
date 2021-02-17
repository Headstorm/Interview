const Project = require( './projectModel' );

exports.index = function( req, res ){
    Project.get( function ( err, projects ) {
        if( err ){
            res.json({
                status: "ERROR",
                message: err,
            });
        }else{
            
            res.json({
                status: 'success',
                message: 'Projects retrieved successfully',
                data: projects.map(item => {
                    return item.nums.sort(function(a, b){
                        return a-b;
                    });
                })

            })
        }
    })
}
exports.new = function( req, res ){
    let project = new Project();
    project.nums = req.body.nums;
    let test = Object.values(project.nums)
    let result = true;
    for(let i = 0; i < test.length; i++){
        if(isNaN(test[i]) === true){
            result = false;
            break
        }
    }
    if(Object.entries(project.nums).length == 500 && result === true){
        project.save(function( err ){
            if( err ){
                res.json( err );
            }
            else{
            res.json({
                message: 'New Project Created!',
                objectValues: test,
                data: project
            })
        }
        })
    }else{
        res.json({
            message: 'Format not met'
        })
    }    
}