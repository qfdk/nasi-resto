const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('web/index')
})

router.get('/services', async (ctx, next) => {
  await ctx.render('web/services')
})

router.get('/menu', async (ctx, next) => {
  await ctx.render('web/menu')
})

router.get('/contact', async (ctx, next) => {
  await ctx.render('web/contact')
})
module.exports = router.routes()
