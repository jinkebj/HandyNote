const SERVER_PORT = 9080
const Koa = require('koa')
const app = new Koa()
app.use(require('koa-static')(__dirname + '/hnweb', {gzip: true}))
app.listen(SERVER_PORT, () => console.log(new Date() + ' - Server started at port: ' + SERVER_PORT))
