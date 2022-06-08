# CenterOS安装Redis5.0.9

注意：Redis6.0需要gcc5.3

## 下载REDIS

[redis下载](https://redis.io/download)

## 查看是否安装gcc

rpm -q gcc

[gcc安装教程](./10/)

## 上传安装包、安装redis

```bash
#新建目录
mkdir -p /home/redis
#上传安装包
cd /home/redis
#解压
tar -zxvf redis-5.0.9.tar.gz
#切换目录
cd /home/redis/redis-5.0.9
#安装
make
#如果编译出错，请使用make clean清除临时文件。之后，找到出错的原因，解决问题后再来重新安装。 
#编译完成后 进入src目录 进行安装 使用 make install
```

## 移动配置、命令文件位置

```bash
#为了方便管理，将Redis文件中的conf配置文件和常用命令移动到统一文件中
mkdir -p /usr/local/redis/bin
mkdir -p /usr/local/redis/etc
cd /home/redis/redis-5.0.9
cp redis.conf /usr/local/redis/etc
cd src
cp mkreleasehdr.sh redis-benchmark redis-check-aof redis-check-rdb redis-cli redis-server /usr/local/redis/bin/
```

##  配置远程连接

```bash
#编辑conf文件
cd /usr/local/redis/etc
vim redis.conf
```

- 将daemonize属性改为yes（表明需要在后台运行）
- 注释bind 127.0.0.1 
- protected-mode属性改为no（表明保护模式关闭）

## 修改密码

编辑conf文件

```
#requirepass foobared去掉注释，foobared改为自己的密码
requirepass 123456
```

## 配置服务

vim /etc/systemd/system/redis.service

ExecStart里指定了服务命令和配置文件的位置

```
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf 
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

## 启动命令

```bash
#设置开机启动
systemctl enable redis
#禁止开机启动
systemctl disable redis
#重载配置
systemctl daemon-reload
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 重启
systemctl restart redis
# 查看状态
systemctl status redis
```

