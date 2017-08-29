# HandyNote

HandyNote project contain the following independent repository:

- HandyNote - Overall info & release wrapper for HandyNote project

- HandyNote-Service - Provide restful/streaming API for HandyNote-Web, HandyNote-Mobile & HandyNote-Desktop

- HandyNote-Web - HandyNote Web App

- HandyNote-Mobile - HandyNote Mobile App, support Android & iOS

- HandyNote-Desktop - HandyNote Desktop App, support Mac / Linux / Windows

## Quick Start

``` bash
# Optional, set npm mirror to speed up npm install in China
npm config set registry https://registry.npm.taobao.org

# install dependencies
npm install

# Set HANDYNOTE_MONGO_URL & HANDYNOTE_SERVICE_API
# if not set, will use HANDYNOTE_MONGO_URL=mongodb://localhost/HandyNote, HANDYNOTE_SERVICE_API=http://localhost:3000/api
export HANDYNOTE_MONGO_URL=mongodb://{usr}:{pwd}@{ip}/HandyNote
export HANDYNOTE_SERVICE_API=http://IP:Port/api

# build release version for HandyNote-Service & HandyNote-Web
npm run build

# start HandyNote-Service & HandyNote-Web in production mode
npm start

# stop HandyNote-Service & HandyNote-Web
npm stop
```
