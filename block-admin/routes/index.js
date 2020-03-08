const router = require('koa-router')()
const mySql = require('../lib/mysql')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '紧急物资调用平台'
  })
})

router.get('/index', async (ctx, next) => {
  await ctx.render('index', {
    title: '紧急物资调用平台'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
