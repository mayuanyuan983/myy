# Redis 

## 1.介绍

是NoSQL的一种，是一个基于内存的高性能key-value（k-v）数据库

Redis支持`string`、`list`、`set`、`zset`（`sorted set`）和`hash`类型数据

master-slave(主从)同步

实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录





## 启动redis

进入根目录执行如下命令

`redis-server.exe redis.windows.conf`