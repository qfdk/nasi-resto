const router = require('koa-router')()
const DB = require('../model/db');

router.use(async (ctx, next) => {
    ctx.state.site = require('../utile/config').site
    await next();
});

router.use(async (ctx, next) => {
    ctx.state.categories = {};
    var tmp = await DB.find('categories', {'parent_id': '0', 'showIndex': true});    // console.log(sousMenu)
    for (var i = 0; i < tmp.length; i++) {
        var sousMenu = await DB.find('categories', {
            'parent_id': DB.getObjectID(tmp[i]._id).toString(),
            'showIndex': true
        });
        ctx.state.categories[tmp[i].name] = sousMenu;
    }
    await next();
});

router.get('/', async (ctx, next) => {
    var produits = await DB.find('produits', {'is_on_sale': true});
    await ctx.render('web/index',
        {
            produits: produits
        })
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
