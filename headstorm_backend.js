var Koa = require("koa");
var Router = require("koa-router");
var bodyParser = require("koa-bodyparser");
var app = new Koa();
var router = new Router();

app.use(bodyParser());

var inputString;
var array;

router.get("/data", ctx => {

ctx.body = array.sort(function(a, b){return a - b});

});


router.post("/data", ctx => {

	//parse json file
	inputString = ctx.request.body;
	array = JSON.parse(JSON.stringify(inputString));

	//check input length
	if (array.length == 500){
		ctx.body = 'recieved';
	} else {
		ctx.body = 'length error';
		ctx.status = 400;
	}

	//chech input type
	for(var i = 0; i < array.length; i++) {
	    if(!Number.isFinite(array[i])){
	    ctx.body = 'type error';
	    ctx.status = 400;
	    }
	}

});

// app.use(router.routes()).use(router.allowedMethods());
app.use(router.routes());
app.listen(3000);

console.log("server started at http:localhost:3000");