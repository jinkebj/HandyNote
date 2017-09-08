const SERVER_PORT = 9080
const ROOT_PATH = __dirname + '/hnweb'
const Koa = require('koa')
const app = new Koa()
app.use(require('koa-static-cache')(ROOT_PATH, {gzip: true, maxAge: 30 * 24 * 60 * 60}))
app.use(async (ctx, next) => require('koa-send')(ctx, '/index.html', {root: ROOT_PATH}).then(() => next()))
app.listen(SERVER_PORT, () => console.log(new Date() + ' - Server started at port: ' + SERVER_PORT))
