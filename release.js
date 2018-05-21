var TARGET_ZIP = './release/handynote.zip'

var shell = require('shelljs')
var zip = require('bestzip')

// run build.js first
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: build HandyNote failed')
  shell.exit(1)
}

// generate release file
zip(TARGET_ZIP, ['dist/', 'package.json', 'pm2.json'], function (err) {
  if (err) {
    console.error(err.stack)
    process.exit(1)
  } else {
    console.log('=== finish generate release file to: ' + TARGET_ZIP + ' ===')
  }
})
