var router = require('koa-router')()

const DB = require('../../model/db');

router.get('/', async (ctx, next) => {
    await ctx.render('admin/login');
})

router.post('/doLogin', async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    var result = await DB.find('admin', { "username": username, "password": password });
    if (result.length > 0) {
        ctx.session.userinfo = result[0];
        ctx.redirect('/admin/index');
    } else {
        ctx.redirect('/admin/login');
    }
});

module.exports = router.routes()
