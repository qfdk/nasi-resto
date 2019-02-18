var router = require('koa-router')();
var DB = require('../model/db');

router.get('/', async (ctx) => {
    ctx.body = { "title": 'api' }
});

router.get('/categories', async (ctx, next) => {
    ctx.body = await DB.find('categories', { 'parent_id': '0', 'showIndex': true });
});

router.get('/categories/:id', async (ctx, next) => {
    var condition = {
        'parent_id': ctx.params.id
    }
    console.log(ctx.params.id)
    ctx.body = await DB.find('categories', condition);
});

router.get('/produits', async (ctx, next) => {
    ctx.body = await DB.find('produits', { 'is_on_sale': true });
});

router.get('/produits/:categorie', async (ctx, next) => {
    ctx.body = await DB.find('produits', { 'cat_id': ctx.params.categorie, 'is_on_sale': true });
});

module.exports = router.routes();