const Router = require('koa-router')

const router = new Router()
// define array length 
const ARRAY_LENGTH = 500

let defaultData = []

/**
 * @description error handle 
 * @param {*} ctx koa ctx
 * @param {*} msg error msg
 */
function httpError(ctx, msg) {
  ctx.status = 400
  ctx.body = {
    errorMsg: msg,
  }
}

router.post('/data', async (ctx, next) => {
  const {
    data
  } = ctx.request.body
  if (!data || !(data instanceof Array) || data.length !== ARRAY_LENGTH) {
    httpError(ctx, 'The parameter must be an array type and the length is 500')
  } else {
    const verification = data.some(item => typeof item !== 'number')
    if (verification) {
      httpError(ctx, 'Each item of the array must be an integer')
    } else {
      defaultData = data
      ctx.body = 'Success'
    }
  }
})

router.get('/data', async (ctx, next) => {
  const data = defaultData
  if (!data || !(data instanceof Array) || data.length !== ARRAY_LENGTH) {
    httpError(ctx, 'Please send a post request to create data first')
  } else {
    ctx.body = {
      data: data.sort()
    }
  }
})

router.patch('/data', async (ctx, next) => {
  const data = defaultData
  if (!data || !(data instanceof Array) || data.length !== ARRAY_LENGTH) {
    httpError(ctx, 'Please send a post request to create data first')
  } else {
    const {
      number
    } = ctx.request.body
    if (!number || typeof number !== 'number') {
      httpError(ctx, 'Please pass numeric parameters')
    } else {
      defaultData.push(number)
      defaultData = defaultData.sort()
      ctx.body = {
        data: defaultData
      }
    }
  }
  ctx.body
})

module.exports = router