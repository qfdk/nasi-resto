var router = require('koa-router')()
var DB = require('../../model/db');
var tools = require('../../utile/tools');

router.get('/', async (ctx, next) => {
    ctx.render('admin/produit/list');
})

router.get('/add', async (ctx, next) => {
    var categories = await DB.find('categories', { 'parent_id': '0' });
    await ctx.render('admin/produit/add', {
        categories: categories
    });
})

router.post('/doAdd', async (ctx, next) => {
    var tmp = {};
    var req = ctx.request.body;
    tmp.name = req.name;
    tmp.desc = req.desc;
    tmp.cat_id = req.cat_id;
    tmp.price = parseFloat(req.price);
    tmp.sort_order = req.sort_order;
    tmp.is_on_sale = tools.parseBool(req.is_on_sale);
    tmp.image = ctx.request.files.image.name ? tools.upload(ctx.request.files.image) : null;
    await DB.insert('produits', tmp);
    ctx.redirect('/admin/produit/list');
})


router.get('/edit', async (ctx, next) => {
    var id = ctx.query.id;
    var produit = await DB.find('produits', { "_id": DB.getObjectID(id) });
    var categories = await DB.find('categories', {});
    await ctx.render('admin/produit/edit', {
        data: produit[0],
        categories: categories
    });
})

router.post('/doEdit', async (ctx, next) => {
    var tmp = {};
    var req = ctx.request.body;
    tmp.name = req.name;
    tmp.desc = req.desc;
    tmp.cat_id = req.cat_id;
    tmp.price = parseFloat(req.price);
    tmp.sort_order = req.sort_order;
    tmp.is_on_sale = tools.parseBool(req.is_on_sale);
    tmp.image = ctx.request.files.image.name ? tools.upload(ctx.request.files.image) : req.imageSrc;
    await DB.update('produits', { "_id": DB.getObjectID(req._id) }, tmp);
    ctx.redirect('/admin/produit/list');
})

router.get('/del', async (ctx, next) => {
    var id = ctx.query.id;
    await DB.delete('produits', { "_id": DB.getObjectID(id) });
    ctx.redirect('/admin/produit/list');
})

router.get('/list', async (ctx, next) => {
    await ctx.render('admin/produit/list', {
        produits: await DB.find('produits', {})
    });
})

module.exports = router.routes()
