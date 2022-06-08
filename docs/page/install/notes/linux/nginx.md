# CenterOs7安装nginx

### 1.上传依赖包

到目录执行

rpm -Uvh *.rpm --nodeps --force

### 2.解压 

tar zxvf nginx-1.18.0.tar.gz 

进入nginx目录  

./configure 

最后会看到类似下面信息，表示编译成功 

```
Configuration summary  

+ using system PCRE library  
+ OpenSSL library is not used  
+ md5: using system crypto library  
+ sha1 library is not used  
+ using system zlib library     
```

### 3.安装

执行 make  

执行 make  install

默认会安装到/usr/local/nginx目录下面 

### 4.启动

/usr/local/nginx/sbin/nginx  

查看是否启动成功 

`ps -ef|grep nginx`

启动成功，master是主进程，关闭的时候kill这个进程，其他子进程会自动关掉 

打开浏览器http://localhost/ 即可看到nginx的默认欢迎页 

Welcome to nginx! 

nginx默认是用80端口，我们可以在nginx安装目录下的conf/nginx.conf文件中更改。 

vim /usr/local/nginx/conf/nginx.conf  

找到以下片段进行更改，然后重启 

```
server {  
       listen       80; //端口  
       server_name  localhost; //绑定域名  
       location / {  
           root   html; //默认目录  
           index  index.html index.htm; //默认首页名称  
       }  
}  
```

更改好后，重启nginx。 

`./nginx -s reload`