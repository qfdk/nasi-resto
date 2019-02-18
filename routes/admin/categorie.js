var router = require('koa-router')()
var DB = require('../../model/db');
var tools = require('../../utile/tools');

Boolean.parse = function (str) {
    if (str) {
        switch (str.toLowerCase()) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                throw new Error("Boolean.parse: Cannot convert string to boolean.");
        }
    }
};

router.get('/', async (ctx, next) => {
    ctx.render('admin/categorie/list');
})

router.post('/doAdd', async (ctx, next) => {
    var tmp = {};
    var req = ctx.request.body;
    tmp.name = req.name;
    tmp.desc = req.desc;
    tmp.parent_id = req.parent_id;
    tmp.sort_order = req.sort_order;
    tmp.image_text = req.image_text;
    tmp.showIndex = Boolean.parse(req.showIndex);
    tmp.image = ctx.request.files.image.name ? tools.upload(ctx.request.files.image) : req.imageSrc;
    await DB.insert('categories', tmp);
    ctx.redirect('/admin/categorie/list');
})

router.get('/add', async (ctx, next) => {
    var categories = await DB.find('categories', {});
    await ctx.render('admin/categorie/add', {
        categories: categories
    });
})

router.get('/edit', async (ctx, next) => {
    var id = ctx.query.id;
    var categorie = await DB.find('categories', { "_id": DB.getObjectID(id) });
    var categories = await DB.find('categories', {});
    await ctx.render('admin/categorie/edit', {
        data: categorie[0],
        categories: categories
    });
})

router.post('/doEdit', async (ctx, next) => {
    var tmp = {};
    var req = ctx.request.body;
    tmp.name = req.name;
    tmp.desc = req.desc;
    tmp.parent_id = req.parent_id;
    tmp.sort_order = req.sort_order;
    tmp.image_text = req.image_text;
    tmp.showIndex = Boolean.parse(req.showIndex);
    tmp.image = ctx.request.files.image.name ? tools.upload(ctx.request.files.image) : req.imageSrc;
    await DB.update('categories', { "_id": DB.getObjectID(req._id) }, tmp);
    ctx.redirect('/admin/categorie/list');
})

router.get('/del', async (ctx, next) => {
    var id = ctx.query.id;
    await DB.delete('categories', { "_id": DB.getObjectID(id) });
    ctx.redirect('/admin/categorie/list');
})

router.get('/list', async (ctx, next) => {
    await ctx.render('admin/categorie/list', {
        list: await DB.find('categories', {})
    });
})

module.exports = router.routes()
