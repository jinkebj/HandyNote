/* This file utilize koa-static-cache to host static file generated by HandyNote-Web */

const SERVER_PORT = 9080
const ROOT_PATH = __dirname + '/hnweb'

const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()

app.use(require('koa-static-cache')(ROOT_PATH, {gzip: true, maxAge: 30 * 24 * 60 * 60}))
app.use(async (ctx, next) => require('koa-send')(ctx, '/index.html', {root: ROOT_PATH}).then(() => next()))

// create https server only when folder '../handynote-cert' exist
let server
let certPath = path.join(__dirname, '../handynote-cert')
if (fs.existsSync(certPath)) {
  const options = {
    key: fs.readFileSync(path.join(certPath, 'server.key')),
    cert: fs.readFileSync(path.join(certPath, 'server.pem'))
  }
  server = https.createServer(options, app.callback())
} else {
  server = http.createServer(app.callback())
}

server.listen(SERVER_PORT, () => console.log(new Date() + ' - Server started at port: ' + SERVER_PORT))
