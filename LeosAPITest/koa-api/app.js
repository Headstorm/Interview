const Koa = require('koa')
const parser = require('koa-bodyparser')
const dataRouter = require('./app/data')
const app = new Koa()
app.use(parser())

app.use(dataRouter.routes())
app.listen(3000)