# active mq安装文档

1. 将apache-activemq-5.15.5-bin.tar.gz安装包上传至/usr/local/src目录

2. 解压 tar -zxvf  apache-activemq-5.15.5-bin.tar.gz

3. 启动

   (1) 切换目录：cd apache-activemq-5.15.5/bin/

   (2) 授权：chmod u+x activemq

   (3) 启动：./activemq start

4. 检查端口情况

    netstat -anp|grep 61616

5. 关闭

   ./activemq stop

6. 重启

   ./activemq restart

7. WEB管理页面：http://IP:8161/admin

   (1) 默认用户名密码 admin/admin

   (2) 修改控制台登录用户名密码：在conf/jetty-realm.properties里修改

8. 应用连接

   (1) 端口：61616

   (2) 账号密码 admin/admin



配置文件：

​	activemq.xml

​	credentials.properties

