### Generate release file for production deployment
```
a. run mongodb without authentication and create mongodb user
    mongo
    use HandyNote
    db.createUser({
        "user": "handy",
        "pwd": "xxxxx",
        "roles": [
            {
                "role" : "readWrite",
                "db" : "HandyNote"
            }
        ]
        })
    exit
```
```
b. stop mongodb and restart with authentication
    mongo
    use admin
    db.shutdownServer()
    exit
    mongod --dbpath /data/mongodata --auth &
```
```
c. generate release file for HandyNote-Service & HandyNote-Web
    cd {HandyNote root folder}
    npm install
    export HANDYNOTE_SERVICE_API=http://{ip}:3000/api
    export HANDYNOTE_MONGO_URL=mongodb://{usr}:{pwd}@{ip}/HandyNote
    npm run release
```
### Setup mongodb HA
```
a. install mongodb and create mongodb user on all servers
```
```
b. prepare key file
// generate key file on one server
openssl rand -base64 741 > mongodb-keyfile
// copy it to all other servers and excute on each server
chmod 600 mongodb-keyfile
sudo mv mongodb-keyfile /etc/
```
```
c. launch mongodb service on each server
nohup mongod --dbpath /data/mongodata --keyFile /etc/mongodb-keyfile --replSet mongors --auth &
```
```
d. run on one server
mongo
> cfg={_id:'mongors',members:[
{_id:0,host:'10.100.0.125:27017'},
{_id:1,host:'10.100.0.126:27017'}]
}
> rs.initiate(cfg)
> rs.addArb("10.100.0.127:27017")
```
```
e. configure autostart on each server, update /etc/rc.local, add the following line(suppose run mongod as "opuser")
su opuser -c "nohup mongod --dbpath /data/mongodata --keyFile /etc/mongodb-keyfile --replSet mongors --auth &"
```
