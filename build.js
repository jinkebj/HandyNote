var fs = require('fs')
var shell = require('shelljs')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1);
}

console.log('=== start build for HandyNote ===')

// check HandyNote-Service & HandyNote-Web folder
shell.cd('..')
if (!fs.existsSync('HandyNote-Service')) {
  shell.echo('HandyNote-Service folder does not exist! Download it from github...')
  if (shell.exec('git clone git@github.com:jinkebj/HandyNote-Service.git').code !== 0) {
    shell.echo('Error: Get HandyNote-Service from github failed');
    shell.exit(1);
  }
}

if (!fs.existsSync('HandyNote-Web')) {
  shell.echo('HandyNote-Web folder does not exist! Download it from github...')
  if (shell.exec('git clone git@github.com:jinkebj/HandyNote-Web.git').code !== 0) {
    shell.echo('Error: Get HandyNote-Web from github failed');
    shell.exit(1);
  }
}

// prepare dist dir
shell.rm('-rf', 'HandyNote/dist')
shell.mkdir('-p', 'HandyNote/dist')

// build HandyNote-Service
console.log('=== start build HandyNote-Service ===')
shell.cd('HandyNote-Service')
if (shell.exec('export HANDYNOTE_MONGO_URL=' + process.env.HANDYNOTE_MONGO_URL
  + ' && export HANDYNOTE_STATIC_ROOT=' + process.env.HANDYNOTE_STATIC_ROOT
  + ' && npm install && npm run build').code !== 0) {
  shell.echo('Error: build HandyNote-Service failed')
  shell.exit(1)
}
shell.cp('dist/app.bundle.js', '../HandyNote/dist/hnservice.js')
shell.cd('..')
console.log('=== finish build HandyNote-Service ===')

// build HandyNote-Web
console.log('=== start build HandyNote-Web ===')
shell.cd('HandyNote-Web')
if (shell.exec('export HANDYNOTE_SERVICE_API=' + process.env.HANDYNOTE_SERVICE_API
    + ' && npm install && npm run build').code !== 0) {
  shell.echo('Error: build HandyNote-Web failed')
  shell.exit(1)
}
shell.cp('-r', 'dist/', '../HandyNote/dist/hnweb')
shell.cp('../HandyNote/hnweb.js', '../HandyNote/dist')
shell.cd('..')
console.log('=== finish build HandyNote-Web ===')

console.log('=== finish build HandyNote ===')
