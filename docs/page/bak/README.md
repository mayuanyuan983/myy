 

# 存档



```
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
```



# [Linux系统上java应用（例如spring boot）启动慢的原因之一](https://www.cnblogs.com/liuqq1015/p/15516903.html)

今天引入一些动态代理后，启动程序时间长达120s，找了下原因，详情可以看一下。简单来说就是，应用启动时有些框架或者日志组件，尤其是spring boot，会直接或间接地多次调用：java.net.InetAddress.getLocalHost()这个调用在操作系统中可能会耗时很久。

解决办法有两种：

1. 就是把本机的hostname 添加到 /etc/hosts 中，例如: 127.0.0.1 localhost myMac

```
cat /etc/hosts

```





# SSH

## 更新密钥 ssh-keygen -R IP

```
更新密钥
ssh-keygen -R IP
查询内容上下五十行输出到out.log
ansible tps -m shell -a "gunzip -c test.log.gz | grep  -C 50 'aaaaaaaaa'" > out.log


ansible tps -m shell -a "gunzip -c /home/aike/dec/log/2022-03-02/dec_debug_2022-03-02_0.log.gz | grep  -C 5 '登录失败'"


tail -1000f ecfc-management-single-system_debug.log |  grep --line-buffer "login" --color=auto
```









```
ansible admin -m shell -a "gunzip -c /home/aike/amin/log/2022-03-22/*.gz | grep '********* upload log end *********‘ "


ansible tps -m shell -a "md5sum /home/aike/dec/tva-dec-0.0.1.jar"

ansible wba -m shell -a "md5sum /home/aike/wechat/tva-wechat-0.0.1.jar"
```

