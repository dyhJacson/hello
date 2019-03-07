const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')

let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
let router = new Router()

router.use('/user', user.routes())
router.use('/goods', goods.routes())

app.use(cors())
app.use(bodyParser())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行
;(async () => {
  await connect()
  initSchemas()
})()
app.use(async ctx => {
  ctx.body = '<h1>Hello koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
