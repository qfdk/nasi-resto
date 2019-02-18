const Koa = require('koa')
const app = new Koa()
const render = require('koa-art-template')
const path = require('path')
const router = require('koa-router')()
const session = require('koa-session')
const koaBody = require('koa-body');

const index = require('./routes/index')
const admin = require('./routes/admin')
const api = require('./routes/api')
app.keys = ['Je suis fort'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// middlewares
app.use(koaBody({
  multipart: true, // 支持文件上传
  //encoding: 'gzip'
  // ,
  // formidable: {
  //   uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
  //   keepExtensions: true,    // 保持文件的后缀
  //   maxFieldsSize: 5 * 1024 * 1024 // 文件上传大小
  // }
}
));

app.use(require('koa-static')(__dirname + '/public'))

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// routes
router.use('/admin', admin);
router.use('/api', api);
router.use(index);

app.use(router.routes()).use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000);
//module.exports = app