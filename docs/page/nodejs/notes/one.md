# node.js 启动本地服务

引入required模块：我们可以使用 require 指令来载入 Node.js 模块。

创建服务器：服务器可以监听客户端的请求。

接收请求与响应请求：服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

**下面开始创建node.js应用：**

**（1）引入require模块**

我们使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下:

新建文件 http.js (D:\学习\code\demo1\http.js)

```js
var http = require("http");
```

**（2）创建服务器**

接下来我们使用http.creatServer()方法创建服务器，并使用listen()方法绑定8080端口。函数通过request,response参数来接收和响应数据。实例如下：

```js
var http = require('http');
http.createServer(function (request, response) {
 // 发送 HTTP 头部 
 // HTTP 状态值: 200 : OK
 // 内容类型: text/plain
 response.writeHead(200, {'Content-Type': 'text/plain'});
 // 发送响应数据 "Hello World"
 response.end('Hello World\n');
}).listen(8080);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');
```

**（3）启动**

命令行输入

```sh
node http.js
```

**（4）访问**

访问[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

可以看到写着”Hello World”的网页