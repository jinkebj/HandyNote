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
    export HANDYNOTE_SERVICE_API=http(s)://{ip}:3000/api
    export HANDYNOTE_MONGO_URL=mongodb://{usr}:{pwd}@{ip}/HandyNote

    // Optional, skip this step if you don't want HandyNote-Service run under https
    // rename ssl key & cert file to server.key & server.pem then put it under HANDYNOTE_CERT_PATH
    export HANDYNOTE_CERT_PATH=/home/xxx/xxx

    npm run release
```

### Port Forwarding on AWS
```
a. In security group of NAT instance allow inbound rule for port 3000(for HanyNote-Service) & 443(for HanyNote-Web https access)
b. Forward 443 to real port HanyNote-Web use, ssh to server:
    sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 9080
c. Verify PREROUTING is added
    sudo iptables -t nat -v -L PREROUTING -n --line-number
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
