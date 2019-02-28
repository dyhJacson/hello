const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')

const Router = require('koa-router')
let user = require('./appApi/user.js')
let router = new Router()
router.use('/user', user.routes())
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行
;(async () => {
  await connect()
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({ userName: 'dengyh123', password: '123456' })
  oneUser.save().then(() => {
    console.log('插入成功')
  })
  let users = await User.findOne({}).exec()
  console.log('------------------')
  console.log(users)
  console.log('------------------')
})()
app.use(async ctx => {
  ctx.body = '<h1>Hello koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
