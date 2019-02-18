const router = require('koa-router')()
const produit = require('./admin/produit')
const categorie = require('./admin/categorie')
const login = require('./admin/login')
var url = require('url');

router.use(async (ctx, next) => {
  ctx.state.title = require('../model/config').site.title;
  await next();
});

router.use(async (ctx, next) => {
  var pathName = url.parse(ctx.request.url).pathname;
  if (ctx.session.userinfo) {
    await next();
  } else {
    if (pathName == '/admin/login' || pathName == '/admin/login/doLogin') {
      await next();
    } else {
      ctx.redirect('/admin/login')
    }
  }
});

router.use('/produit', produit);
router.use('/categorie', categorie);
router.use('/login', login);

router.get('/', async (ctx, next) => {
  await ctx.redirect('/admin/login')
})

router.get('/index', async (ctx, next) => {
  await ctx.render('admin/index')
})

router.get('/logout', async (ctx, next) => {
  ctx.session.userinfo = null;
  await ctx.render('admin/login')
})
module.exports = router.routes()
