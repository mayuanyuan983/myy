# Linux安装MINIO

## 上传安装包

```bash
#新建minio安装目录和数据目录：
mkdir -p /home/minio/data
#上传MINIO二进制文件至安装目录 /home/minio
cd /home/minio
unzip minio.zip
#为minio添加执行权限
chmod +x minio
```

## 配置服务

vim /etc/default/minio

安装位置修改、账号密码修改、端口

```bash
MINIO_VOLUMES="/home/minio/data"
#设置用户名密码 密码最少8位 
MINIO_ROOT_USER="minioadmin"
MINIO_ROOT_PASSWORD="minioadmin"
#指定IP和端口启动
MINIO_OPTS="--address '0.0.0.0:9000' --console-address '0.0.0.0:9001'"
```

### 服务文件

vim /etc/systemd/system/minio.service

安装位置修改

`AssertFileIsExecutable=/home/minio/minio`

`WorkingDirectory=/home/minio`

`ExecStart=/home/minio/minio server $MINIO_OPTS $MINIO_VOLUMES`

```sh
[Unit]
Description=MinIO
Documentation=https://docs.min.io
Wants=network-online.target
After=network-online.target

AssertFileIsExecutable=/home/minio/minio

[Service]
WorkingDirectory=/home/minio

User=root
Group=root
ProtectProc=invisible

EnvironmentFile=-/etc/default/minio
ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
ExecStart=/home/minio/minio server $MINIO_OPTS $MINIO_VOLUMES

# Let systemd restart this service always
Restart=always

# Specifies the maximum file descriptor number that can be opened by this process
LimitNOFILE=65536

# Specifies the maximum number of threads this process can create
TasksMax=infinity

# Disable timeout logic and wait until process is stopped
TimeoutStopSec=infinity
SendSIGKILL=no

[Install]
WantedBy=multi-user.target

# Built for ${project.name}-${project.version} (${project.name})
```

## 启动命令

```sh
#设置开机启动
systemctl enable minio
#禁止开机启动
systemctl disable minio
#重载配置
systemctl daemon-reload
# 启动
systemctl start minio
# 停止
systemctl stop minio
# 重启
systemctl restart minio
# 查看状态
systemctl status minio
```

## 页面访问

http://ip:9000

