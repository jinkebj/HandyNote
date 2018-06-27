# HandyNote

HandyNote provide full stack open source solution for note taking and personal knowledge management. It contains the following independent repository:

- [HandyNote](https://github.com/jinkebj/HandyNote) - Overall info & release wrapper for HandyNote

- [HandyNote-Service](https://github.com/jinkebj/HandyNote-Service): Server solution for HandyNote, provide restful/streaming API support

- [HandyNote-Web](https://github.com/jinkebj/HandyNote-Web): Web portal for HandyNote, support most modern browser include firefox / safari / chrome / edge

- [HandyNote-Mobile](https://github.com/jinkebj/HandyNote-Mobile): Android & iOS app for HandyNote

- [HandyNote-Desktop](https://github.com/jinkebj/HandyNote-Desktop): Desktop app for HandyNote, support Mac / Linux / Windows **(NOT started yet)**

![](doc/hn-architect.png)

## Why create HandyNote

I used to use Evernote, then switch to Youdao Note, then switch to WizNote. They are both awesome but none of them can provide all features I need and it's a pain to migrate data for switch one note solution to another. I want a full stack solution which can address all my current requirements and easily extended to support future possible requirement without worry about data migration. That's the intention of create HandyNote.

## Features

- 100% control on your personal data (support private cloud or self-hosted server)

- Access anywhere (windows/linux/mac web browser, android, ios)

- Sync data across all endpoint (web browser, android phone, iPhone)

- Uniform UI for Android & iOS, compliance with Material Design

- Catch image file in notes (referenced or embedded) to HandyNote server automatically

- In-place image edit support (zoom, rotate, corp)

## Screenshots for Web Portal

**Login Page**

![](screenshots/hn-web-login.png)

**Edit Note**

![](screenshots/hn-web-edit-note.png)

**One Column View**

![](screenshots/hn-web-1column-view.png)

**Two Column View**

![](screenshots/hn-web-2column-view.png)

**Three Column View**

![](screenshots/hn-web-3column-view.jpg)

**Move Note**

![](screenshots/hn-web-move-note.png)

**Edit Folder**

![](screenshots/hn-web-edit-folder.png)

**Edit Note Image**

![](screenshots/hn-web-edit-image.jpg)

## Screenshots for Android app

<img src="screenshots/hn-android-login.jpg" alt="Login" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-note-action.jpg" alt="NoteAction" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-edit-folder.jpg" alt="EditFolder" width="280" height="500"><br>

<img src="screenshots/hn-android-view-folder.jpg" alt="ViewFolder" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-view-note.jpg" alt="ViewNote" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-edit-note.jpg" alt="EditNote" width="280" height="500"><br>

<img src="screenshots/hn-android-view-image.jpg" alt="ViewImage" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-edit-image.jpg" alt="EditImage" width="280" height="500"><br>

## Screenshots for iOS app

<img src="screenshots/hn-ios-recents.jpg" alt="Recents" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-ios-list-folder.jpg" alt="ListFolder" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-ios-view-note.jpg" alt="ViewNote" width="280" height="500"><br>

<img src="screenshots/hn-ios-edit-note.jpg" alt="EditNote" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-ios-add-image.jpg" alt="AddImage" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-ios-move-to.jpg" alt="MoveTo" width="280" height="500"><br>

## Setup your own HandyNote in 10 minutes

#### 1. Install [MongoDB 3.2 or above](https://www.mongodb.com) and create initial data
```
a. run mongodb without authenticate
    mongod --dbpath /data/mongodata &
```
```
b. connect with mongo client to create HandyNote user
    mongo
    use HandyNote
    db.users.save({_id:"mytest",password:"xxxxx",usn:1})
    exit
```
###### Note: For production use, please do remember to restart mongod with --auth

#### 2. Install [Node.js 8.x or above](https://nodejs.org)

#### 3. Prepare HandyNote release file
- For test purpose - [Download pre-built release file](https://github.com/jinkebj/HandyNote/raw/master/release/handynote.zip)
- For production use - [Build your own release file](https://github.com/jinkebj/HandyNote/blob/master/doc/production-deployment.md)

then, unzip release file to /data/HandyNote
- For production use - if you want HandyNote-Web run under https, please rename ssl key & cert file to server.key & server.pem then put it to /data/HandyNote/handynote-cert

then, run following cmd:
```
cd /data/HandyNote
npm install --production
npm start
```

#### 4. Visit http://{ip}:9080, login with HandyNote user created in Step 1

#### 5. For android phone, install [HandyNote android app](https://github.com/jinkebj/HandyNote/raw/master/release/handynote-android.apk), on login page -> switch server -> input HandyNote service url with format http(s)://{ip}:3000/api and press "SWITCH" button

<img src="screenshots/hn-android-switch-server.jpg" alt="NoteAction" width="280" height="500">&nbsp;&nbsp;&nbsp;
<img src="screenshots/hn-android-switch-server2.jpg" alt="EditFolder" width="280" height="500"><br>

#### 6. For iPhone, the HandyNote app has not published to apple app store yet, but you can follow https://github.com/jinkebj/HandyNote-Mobile/blob/master/README.md#debug-on-ios to install debug version on your iPhone, then switch server like Step 5

## Build & Release

``` bash
# Optional, set npm mirror to speed up npm install in China
npm config set registry https://registry.npm.taobao.org

# install dependencies
npm install

# Optional, set HANDYNOTE_CERT_PATH
# if set, HandyNote-Service will run under https server
#     please rename ssl key & cert file to server.key & server.pem then put it under HANDYNOTE_CERT_PATH
# if not set, HandyNote-Service will run under http server
export HANDYNOTE_CERT_PATH=/home/xxx/xxx

# set HANDYNOTE_SERVICE_API, HANDYNOTE_MONGO_URL & HANDYNOTE_STATIC_ROOT
# if not set, will use:
#     HANDYNOTE_SERVICE_API=http://localhost:3000/api
#     HANDYNOTE_MONGO_URL=mongodb://localhost/HandyNote
#     HANDYNOTE_STATIC_ROOT=./handynote-static
export HANDYNOTE_SERVICE_API=http(s)://IP:Port/api
export HANDYNOTE_MONGO_URL=mongodb://{usr}:{pwd}@{ip}/HandyNote
export HANDYNOTE_STATIC_ROOT=/home/xxx/xxx

# build distribution file for HandyNote-Service & HandyNote-Web
npm run build

# start HandyNote-Service & HandyNote-Web as service
npm start

# stop HandyNote-Service & HandyNote-Web service
npm stop

# remove HandyNote-Service & HandyNote-Web service
npm run remove

# release zip file for HandyNote-Service & HandyNote-Web
npm run release
```

## Others

- [Design Ideas](https://github.com/jinkebj/HandyNote/blob/master/doc/design.md)
- [Production Deployment](https://github.com/jinkebj/HandyNote/blob/master/doc/production-deployment.md)
