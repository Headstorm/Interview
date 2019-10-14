module.exports=function(sequalize,Sequlize){
    const schema={
        numbers:{
            type:Sequlize.STRING
        }
        }
    const numberModel=sequalize.define('numberModel',schema,{
        timestamp:false

    });

    return numberModel;
}
