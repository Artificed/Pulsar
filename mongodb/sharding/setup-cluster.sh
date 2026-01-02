docker exec -it configsvr1 mongosh --port 27017 --eval "
rs.initiate({
  _id: 'config_rs',
  configsvr: true,
  members: [
    { _id: 0, host: '192.168.100.2:10001' },
    { _id: 1, host: '192.168.100.3:10002' },
    { _id: 2, host: '192.168.100.4:10003' }
  ]
})
"

docker exec -it shardsvr1_1 mongosh --port 27017 --eval "
rs.initiate({
  _id: 'shard1_rs',
  members: [
    { _id: 0, host: '192.168.100.2:20001' },
    { _id: 1, host: '192.168.100.3:20002' },
    { _id: 2, host: '192.168.100.4:20003' }
  ]
})
"

docker exec -it shardsvr2_1 mongosh --port 27017 --eval "
rs.initiate({
  _id: 'shard2_rs',
  members: [
    { _id: 0, host: '192.168.100.2:20004' },
    { _id: 1, host: '192.168.100.3:20005' },
    { _id: 2, host: '192.168.100.4:20006' }
  ]
})
"

docker exec -it mongos1 mongosh --port 27017 --eval "
sh.addShard('shard1_rs/192.168.100.2:20001,192.168.100.3:20002,192.168.100.4:20003');
sh.addShard('shard2_rs/192.168.100.2:20004,192.168.100.3:20005,192.168.100.4:20006');
sh.status();
"

docker exec -i mongos1 mongosh --port 27017 < ../migration/init-db.js

docker exec -it mongos1 mongosh --port 27017 --eval "
sh.enableSharding("pulsar_user_db")
use pulsar_user_db
db.users.createIndex({ "_id": "hashed" })
sh.shardCollection("pulsar_user_db.users", { "_id": "hashed" })

sh.enableSharding("pulsar_event_db")
use pulsar_event_db
db.events.createIndex({ "_id": "hashed" })
sh.shardCollection("pulsar_event_db.events", { "_id": "hashed" })
"

docker exec -it mongos1 mongosh --port 27017 --eval "
use admin
db.createUser({
  user: 'root',
  pwd: 'test123',
  roles: ['root']
})
"