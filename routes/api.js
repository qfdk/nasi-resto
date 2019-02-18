var router = require('koa-router')();

router.get('/', async (ctx) => {
    ctx.body = { "title": 'api' }
});

router.get('/all', async (ctx) => {
    ctx.body = { "title": 'test' }
});

module.exports = router.routes();