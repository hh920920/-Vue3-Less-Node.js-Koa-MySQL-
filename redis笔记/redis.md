# 一、启动redis

* 运行cmd切换到redis根目录，先启动服务端

* **命令：redis-server.exe redis.windows.conf** 

* 可能会启动失败，报28 Nov 09:30:50.919 # Creating Server TCP listening socket 127.0.0.1:6379: bind: No error

  5，报错后，输入redis-cli.exe
  6，输入shutdown 结束
  7，输入 exit 退出
  8，继续输入 **redis-server.exe redis.windows.conf** 启动redis命令，启动成功。

  启动客户端
  redis-cli.exe
  关闭服务端
  shutdown
  退出服务
  exit

# 二、客户端连接

redis-cli   默认连接的本地redis服务

redis-cli -h 106.12.126.206 -p 6379   // -h：连接redis服务器的IP， -p：连接redis服务器的端口号

```
redis-server.exe
另开一个cmd切换到redis根目录，启动客户端

redis-cli.exe -h 127.0.0.1 -p 6379
客户端使用config get requirepass命令查看密码
```



# 三、设置密码

* 设置密码有两种方式。 （1、命令行设置密码。 2、修改redis.conf文件）

1. 命令行设置密码

```
// 初始查看密码命令： config get requirepass
// 显示为空：
1)"requirepass"  
2)""   

// 设置密码命令：
客户端启动6379端口后使用：config set requirepass yourpassword 命令设置密码
例如：config set requirepass 123456
OK  // 显示OK表示设置成功

// 一旦设置了密码，必须先验证通过密码，否则所有操作不可用
// 使用 auth password 验证密码，如：auth 123456
auth 123456
OK

// 验证后，可以查看密码：
config get requirepass
(error)NOAUTH Authentication required
1)"requirepass"
2)"123456"

```

# 四、设置访问来源

* 设置权限有两种方式。 （1、通过命令行。 2、修改redis.conf文件）

1、命令行设置：

```
// 查看：
config get bind
// 显示默认是只能本机访问
1) "bind"
2) "127.0.0.1"

bind 0.0.0.0    #这种是方式是远程所有的主机都能访问，存在安全问题


// 查看权限：
config get protected-mode
// 显示：yes 
// 把protected-mode yes 改为 protected-mode no
yes                       保护模式，只允许本地链接
no                        保护模式关闭

```

2 、修改conf文件：

```
protected-mode no  改为no 这个的意思是关闭受保护模式

bind 127.0.0.1  这个前面加注释
```

# 五、数据类型

* Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

* string 是 redis 最基本的类型，string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。

* Redis hash 是一个键值(key=>value)对集合。

* Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

* List(列表)简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

* Set 是 string 类型的无序集合。是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

* zset(有序集合)是 string 类型的有序集合。zset的成员是唯一的,但分数(score)却可以重复。

# 六、kyes命令

del key key存在时删除key

exists key 检查key是否存在

expire key seconds(秒) 为key设置过期时间，以秒计算

expire key timestamp(毫秒) 设置key的过期时间以毫秒计算

persist key 移除key的过期时间，key将持久保持

keys * 查询所有的键名

pttl key 以毫秒为单位返回key的剩余过期时间

randomkey  从当前数据库中随机返回一个key

rename key newkey  修改key的名称

renamenx key newkey 当newkey不存在时，将key改名为newkey

move key  db  将当前数据库的key移动到给定的数据库db当中

type key  返回key所存储值的类型



# 七、各类型介绍

### 1. string(字符串)

1. 一个字符串类型的值最大长度为512 M。

2. 常见操作: get,set,mget,mset,incr(计数器++),decr(--)等等;

   ```javascript
    client.set('hello', 5, function(err, obj) {
        client.incr('hello', function(err,data) {
            client.get('hello', function(err,data) {
                console.log(data);         // 6
            })
        })
    })
   ```

### 2. hash(哈希)

1. hash可用来存储对象,一个Redis 列表中最多可存储232-1(40亿)个元素

   ```javascript
    var obj = {
        name:'sss',
        age:223
    }
    client.hset("test", obj, function(err, obj) {
        client.hgetall('test', (err, obj) => {
            console.log(`hgetall:${JSON.stringify(obj)}`);
            console.log(obj.age);
        })
        client.hget('test','name', function(err, name) {
            console.log('hget test name');
            console.log(name);
        })
    });
   ```

### 3. lists(列表)

1. 对于lists,使用send_command进行操作;

2. 队列操作

3. list,常用操作, list,常用操作, lpush(首位添加),rpush(末位添加),lset(修改首位值),lindex(删除首位元素),lpop(删除末位元素)

4. 一个Redis 列表中最多可存储232-1(40亿)个元素

   ```javascript
    	client.send_command('lset',['mylist',0,1], function(err,data) {
    	    console.log(data);          // OK
    	})
    	client.send_command('lpush',['mylist', 'one'], function(err, data) {
    	    console.log(dada);          //OK 
    	})
    	
    	// 使用命令行获取对应的索引下的结果
    	// lindex mylist 0    'one'
    	// lindex mylist 1   '1'
    	// lindex mylist 2   'xxx'
    	// lindex mylist 3   'xxx'
   ```

### 4. sets(集合)

1. sets 集合处理; 业务中用lodash进行交并补也是一个不错的选择。

2. 常见操作: sadd、smembers、sinter(交)、sunion(并)、sdiff(补)、smove

3. 集合中不允许重复成员的存在。当多次添加一个元素时，其结果会设置单个成员多次。一个Redis 集合中最多可包含232-1(40亿)个元素。

   ```javascript
    let db1 = ['mysql','redis'];
    let db2 = ['mongo','redis'];
    client.sadd('db1',db1, function(err,data) {
        client.smembers('db1', function(err,data) {
            console.log(toString.call(data));               // [object Array]
            console.log('smemers:' + data);                 // 获取set中的成员, ['redis,mysql]  
        })
        client.sadd('db2', db2, function(err, data) {
            client.sinter('db1','db2', function(err,data) {
                console.log('sinter:' + data)                    //交集: sinter:redis
            });
            client.sunion('db1','db2', function(err,data) {
                console.log('sunion:' + data)                    // 并集: sunion:mongo,mysql,redis
            });
            client.sdiff('db1','db2', function(err,data) {
                console.log('SDIFF:' + data)                     // 补集: SDIFF:mysql
            })
        })
    });
   ```

### 4. 有序集合(SortedSets)

1. 常用操作: zadd(设置元素), zrange(获取范围内的元素),zrank(获取指定元素的排名，从0开始), zscore(获取指定元素的score，用户指定的score)

   ```javascript
    client.zadd(['zdb',0,'mysql', 1,'mongo',2,'redis'], function(err, data) {
        console.log(data);           // 3
    })
   ```

### 5. 事务

1. 事务(multi命令): 批量执行所有的命令，并统一返回结果

   ```bash
    client.multi()
        .set('xiao','xing')
        .get('xiao')
        .exec(function(err,replies) {
            console.log(replies);         // [ 'OK', 'xing' ]
        })
   ```

### 6. 订阅发布模式

1. redis的订阅发布模式可用来做类似kafka的消息推送;

2. 使用list + redis的订阅发布模式可以构建一个不错的消息队列;

   ```javascript
    let sub = redis.createClient(6379, '127.0.0.1');   // 监听消费者
    let pub = redis.createClient(6379, '127.0.0.1');   // 生产者
    
    // 在sub开始监听时允许触发subscribe事件进行操作,类似连接数据库的connect事件
    sub.on('subscribe', function(channel, count) {
        console.log(`${channel}:${count}`);               //  test channel:1
        pub.publish('test channel', 'channel message test')
    })
    sub.on('message', function(channel, message) {
        console.log(`${channel}-message:${JSON.stringify(message)}`)    // test channel-message:"channel message test"
    })
    sub.subscribe('test channel');
   ```

### 6. 对整个redis的所有客户端操作进行监听;

1. monitor事件可以监听到redis收到的所有客户端命令

   ```lua
    client.monitor(function(err, res) {
        console.log(res);   // ok
    })
    client.on("monitor", function (time, args) {
        console.log(time + ": " + util.inspect(args));             // 1556285641.395573: [ 'lindex', 'myset', '2' ]
    });
   ```