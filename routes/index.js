const router = require('koa-router')()
const DB = require('../model/db');

router.use(async (ctx, next) => {
    ctx.state.categories = await DB.find('categories', {'parent_id': '0', 'showIndex': true});
    await next();
});

router.get('/', async (ctx, next) => {
    await ctx.render('web/index')
})
router.get('/index', async (ctx, next) => {
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
