# two  

[什么是 redis 的雪崩、穿透和击穿？](https://zhuanlan.zhihu.com/p/74880843)

### Redis 雪崩：

雪崩就是指缓存中**大批量热点数据过期**后系统涌入大量查询请求，因为大部分数据在Redis层已经失效，请求渗透到数据库层，大批量请求犹如洪水一般涌入，引起数据库压力造成查询堵塞甚至宕机。

**解决办法：**

1. 将缓存失效时间分散开，比如每个key的过期时间是随机，防止同一时间大量数据过期现象发生，这样不会出现同一时间全部请求都落在数据库层，如果缓存数据库是分布式部署，将热点数据均匀分布在不同Redis和数据库中，有效分担压力，别一个人扛。
2. 简单粗暴，让Redis数据永不过期（如果业务准许，比如不用更新的名单类）。当然，如果业务数据准许的情况下可以，比如中奖名单用户，每期用户开奖后，名单不可能会变了，无需更新。

缓存雪崩的事前事中事后的解决方案如下。 

- 事前：redis 高可用，主从+哨兵，redis cluster，避免全盘崩溃。
- 事中：本地 ehcache 缓存 + hystrix 限流&降级，避免 MySQL 被打死。
- 事后：redis 持久化，一旦重启，自动从磁盘上加载数据，快速恢复缓存数据。

用户发送一个请求，系统 A 收到请求后，先查本地 ehcache 缓存，如果没查到再查 redis。如果 ehcache 和 redis 都没有，再查数据库，将数据库中的结果，写入 ehcache 和 redis 中。

限流组件，可以设置每秒的请求，有多少能通过组件，剩余的未通过的请求，怎么办？**走降级**！可以返回一些默认的值，或者友情提示，或者空白的值。

好处： - 数据库绝对不会死，限流组件确保了每秒只有多少个请求能通过。 - 只要数据库不死，就是说，对用户来说，2/5 的请求都是可以被处理的。 - 只要有 2/5 的请求可以被处理，就意味着你的系统没死，对用户来说，可能就是点击几次刷不出来页面，但是多点几次，就可以刷出来一次。



### 缓存穿透

对于系统A，假设一秒 5000 个请求，结果其中 4000 个请求是黑客发出的恶意攻击。

黑客发出的那 4000 个攻击，缓存中查不到，每次你去数据库里查，也查不到。

举个栗子。数据库 id 是从 1 开始的，结果黑客发过来的请求 id 全部都是负数。这样的话，缓存中不会有，请求每次都“视缓存于无物”，直接查询数据库。这种恶意攻击场景的缓存穿透就会直接把数据库给打死。

解决方式很简单，每次系统 A 从数据库中只要没查到，就写一个空值到缓存里去，比如 `set -999 UNKNOWN`。然后设置一个过期时间，这样的话，下次有相同的 key 来访问的时候，在缓存失效之前，都可以直接从缓存中取数据。

### 缓存击穿

缓存击穿，就是说某个 key 非常热点，访问非常频繁，处于集中式高并发访问的情况，当这个 key 在失效的瞬间，大量的请求就击穿了缓存，直接请求数据库，就像是在一道屏障上凿开了一个洞。

这里指的是单个key发生高并发



**1 .通过synchronized+双重检查机制：某个key只让一个线程查询，阻塞其它线程**

在同步块中，继续判断检查，保证不存在，才去查DB

```java
  private static volaite Object lockHelp=new Object();

   public String getValue(String key){

     String value=redis.get(key,String.class);

     if(value=="null"||value==null||StringUtils.isBlank(value){

         synchronized(lockHelp){

                value=redis.get(key,String.class);

                 if(value=="null"||value==null||StringUtils.isBlank(value){

                     value=db.query(key);

                      redis.set(key,value,1000);

                  }

            }

           }    

        return value;

   }
```

缺点: 会阻塞其它线程

2.将热点数据设置为永远不过期；

这种方式可以说是最可靠的，最安全的但是占空间，内存消耗大，并且不能保持数据最新 这个需要根据具体的业务逻辑来做 

个人觉得如果要保持数据最新不放这么试试，仅供参考：

起个定时任务或者利用TimerTask 做定时，每个一段时间多这些值进行数据库查询更新一次缓存，当然前提时不会给数据库造成压力过大(这个很重要)

3.基于 redis or zookeeper 实现互斥锁，等待第一个请求构建完缓存之后，再释放锁，进而其它请求才能通过该 key 访问数据。

``` java
public String get(key) {
    String value = redis.get(key);
    if (value == null) { //代表缓存值过期
        //设置3min的超时，防止del操作失败的时候，下次缓存过期一直不能load db
        if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  //代表设置成功
            value = db.get(key);
                    redis.set(key, value, expire_secs);
                    redis.del(key_mutex);
            } else {  //这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可
                    sleep(50);
                    get(key);  //重试
            }
        } else {
            return value;      
        }
}
```

4. 使用互斥锁(mutex key)

业界比较常用的做法，是使用mutex。简单地来说，就是在缓存失效的时候（判断拿出来的值为空），不是立即去load db，而是先使用缓存工具的某些带成功操作返回值的操作（比如Redis的SETNX或者Memcache的ADD）去set一个mutex key，当操作返回成功时，再进行load db的操作并回设缓存；否则，就重试整个get缓存的方法。

SETNX，是「SET if Not eXists」的缩写，也就是只有不存在的时候才设置，可以利用它来实现锁的效果。在redis2.6.1之前版本未实现setnx的过期时间，所以这里给出两种版本代码参考：

```
public String get(key) {
      String value = redis.get(key);
      if (value == null) { //代表缓存值过期
          //设置3min的超时，防止del操作失败的时候，下次缓存过期一直不能load db
          if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  //代表设置成功
               value = db.get(key);
                      redis.set(key, value, expire_secs);
                      redis.del(key_mutex);
                     return value;
              } else {  //这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可
                      sleep(10);
                      get(key);  //重试
              }
          } else {
              return value;      
          }
}
```

缺点:

1. 代码复杂度增大

2. 存在死锁的风险

3. 存在线程池阻塞的风险