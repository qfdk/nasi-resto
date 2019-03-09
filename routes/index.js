const router = require('koa-router')()
const DB = require('../model/db');

router.use(async (ctx, next) => {
    ctx.state.site = require('../utile/config').site
    await next();
});

router.use(async (ctx, next) => {
    ctx.state.categories = {};
    var tmp = await DB.find('categories', { 'parent_id': '0', 'showIndex': true });    // console.log(sousMenu)
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
    var categories = await DB.find('categories', { 'parent_id': '0', 'showIndex': true });
    var map = {};
    for (var i = 0; i < categories.length; i++) {

        var produits = await DB.find('produits', { 'is_on_sale': true,'cat_id':categories[i]._id.toString() });
        var tmp={};
        tmp['produits']= produits;
        tmp['desc'] = categories[i].desc;
        map[categories[i].name] = tmp;
    }
    await ctx.render('web/index',
        {
            produits: map
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
