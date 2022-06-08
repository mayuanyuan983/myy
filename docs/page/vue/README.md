# Vue

这里描述了Vue的相关教程

[websocket心跳重连](https://blog.csdn.net/qq_33599109/article/details/87631435)



[九个vue前端UI框架](https://blog.csdn.net/qq_38822390/article/details/82188276)



[Vue全局封装组件](https://segmentfault.com/a/1190000020491447)



[Vue多页面应用](https://www.jianshu.com/p/eceb2ac9df90)



[vue-router基本使用](https://www.cnblogs.com/SamWeb/p/6610733.html)

VScode代码格式化：Windows 上是 Alt + Shift + F

```javascript
var num = '01';
alert(~~num);
```

这里(~~str)就能去处数字前面的0；



## 前端分页

let begin = (page - 1) * limit;

​    let end = page * limit;

​    _this.list = data.list.slice(begin, end)

```
var data = tableData.slice((page - 1) * limit, (page - 1) * limit + limit);
```