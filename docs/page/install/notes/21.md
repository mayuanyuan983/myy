# Linux 下vsftp安装说明

## 安装FTP服务

1. 上传vsftpd-3.0.2-28.el7.x86_64.rpm文件到目录
2. 执行安装命令：`rpm -ivh vsftpd-3.0.2-28.el7.x86_64.rpm`
3. FTP服务自启动：`systemctl enable vsftpd`
4. 开启FTP服务：`systemctl start vsftpd`
5. 停止FTP服务：`systemctl stop vsftpd`
6. 重启FTP服务：`systemctl restart vsftpd`
7. 查看FTP服务状态：`systemctl status vsftpd`

## FTP两种模式说明

### 被动模式：

客户端一般不需要设置防火墙，服务器需要开启21端口准入，并设置被动模式数据端口范围P，并在防火墙中开启P的准入

### 主动模式：

1. 服务器没有“物理防火墙”的情况下，只需要在服务器操作系统中开启21端口的准入，20端口的准出默认是允许的（Windows系统防火墙默认是不拦截“准出”的）。
2. 服务器有“物理防火墙”的情况下，需要在“物理防火墙”中开启21端口的准入，20端口的准出。
3. 客户端需要设置“允许应用程序通过防火墙”（WinSCP.exe、FlashFXP等）

## FTP被动模式配置

1. 修改配置文件：`vim /etc/vsftpd/vsftpd.conf`

   1. 被动模式端口：

   ```bash
   pasv_enable=YES #被动模式开启#在linux上，如果不配置pasv_enable=NO，默认是passive模式
   # 被动模式传输使用端口
   #设定在PASV模式下，建立数据传输所可以使用port范围的下界和上界，0 表示任意(1024 – 65535端口)。默认值为0。
   pasvrt=5555
   pasv_max_port=6666
   ```

2. 如果服务器有防火墙需要开被动模式端口范围的准入

3. 限制所有用户登录FTP时都只能访问主目录，不能向上访问

   ```bash
   chroot_local_user=YES
   chroot_list_enable=NO
   allow_writeable_chroot=YES
   ```

4. 查看FTP创建文件及文件夹的权限，如果没有权限则无法创建文件和文件夹

```bash
#执行命令
getsebool -a|grep ftp
```

​	展示如下

```bash
allow_ftpd_anon_write --> on   
allow_ftpd_full_access --> on //创建文件及文件夹  
allow_ftpd_use_cifs --> off  
allow_ftpd_use_nfs --> off  
ftp_home_dir --> on //显示文件夹及文件  
ftpd_connect_db --> off  
ftpd_use_passive_mode --> off  
```

​	allow_ftpd_full_access如果是off，运行如下指令

```bash
#执行命令
setsebool allow_ftpd_full_access=1  
```

5. 新建FTP用户
   1. 创建用户：`useradd ftpuser`
   2. 添加密码：`passwd ftpuser` 输入密码 `ftpuser`
   3. 禁止SSH登录：`usermod -s /usr/sbin/nologin ftpuser`

```
# Example config file /etc/vsftpd/vsftpd.conf
#
# The default compiled in settings are fairly paranoid. This sample file
# loosens things up a bit, to make the ftp daemon more usable.
# Please see vsftpd.conf.5 for all compiled in defaults.
#
# READ THIS: This example file is NOT an exhaustive list of vsftpd options.
# Please read the vsftpd.conf.5 manual page to get a full idea of vsftpd's
# capabilities.
#
# Allow anonymous FTP? (Beware - allowed by default if you comment this out).
anonymous_enable=NO
#
# Uncomment this to allow local users to log in.
# When SELinux is enforcing check for SE bool ftp_home_dir
local_enable=YES
#
# Uncomment this to enable any form of FTP write command.
write_enable=YES
#
# Default umask for local users is 077. You may wish to change this to 022,
# if your users expect that (022 is used by most other ftpd's)
local_umask=022
#
# Uncomment this to allow the anonymous FTP user to upload files. This only
# has an effect if the above global write enable is activated. Also, you will
# obviously need to create a directory writable by the FTP user.
# When SELinux is enforcing check for SE bool allow_ftpd_anon_write, allow_ftpd_full_access
#anon_upload_enable=YES
#
# Uncomment this if you want the anonymous FTP user to be able to create
# new directories.
#anon_mkdir_write_enable=YES
#
# Activate directory messages - messages given to remote users when they
# go into a certain directory.
dirmessage_enable=YES
#
# Activate logging of uploads/downloads.
xferlog_enable=YES
#
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES
#
# If you want, you can arrange for uploaded anonymous files to be owned by
# a different user. Note! Using "root" for uploaded files is not
# recommended!
#chown_uploads=YES
#chown_username=whoever
#
# You may override where the log file goes if you like. The default is shown
# below.
#xferlog_file=/var/log/xferlog
#
# If you want, you can have your log file in standard ftpd xferlog format.
# Note that the default log file location is /var/log/xferlog in this case.
xferlog_std_format=YES
#
# You may change the default value for timing out an idle session.
#idle_session_timeout=600
#
# You may change the default value for timing out a data connection.
#data_connection_timeout=120
#
# It is recommended that you define on your system a unique user which the
# ftp server can use as a totally isolated and unprivileged user.
#nopriv_user=ftpsecure
#
# Enable this and the server will recognise asynchronous ABOR requests. Not
# recommended for security (the code is non-trivial). Not enabling it,
# however, may confuse older FTP clients.
#async_abor_enable=YES
#
# By default the server will pretend to allow ASCII mode but in fact ignore
# the request. Turn on the below options to have the server actually do ASCII
# mangling on files when in ASCII mode. The vsftpd.conf(5) man page explains
# the behaviour when these options are disabled.
# Beware that on some FTP servers, ASCII support allows a denial of service
# attack (DoS) via the command "SIZE /big/file" in ASCII mode. vsftpd
# predicted this attack and has always been safe, reporting the size of the
# raw file.
# ASCII mangling is a horrible feature of the protocol.
#ascii_upload_enable=YES
#ascii_download_enable=YES
#
# You may fully customise the login banner string:
#ftpd_banner=Welcome to blah FTP service.
#
# You may specify a file of disallowed anonymous e-mail addresses. Apparently
# useful for combatting certain DoS attacks.
#deny_email_enable=YES
# (default follows)
#banned_email_file=/etc/vsftpd/banned_emails
#
# You may specify an explicit list of local users to chroot() to their home
# directory. If chroot_local_user is YES, then this list becomes a list of
# users to NOT chroot().
# (Warning! chroot'ing can be very dangerous. If using chroot, make sure that
# the user does not have write access to the top level directory within the
# chroot)
chroot_local_user=YES
chroot_list_enable=NO
# (default follows)
#chroot_list_file=/etc/vsftpd/chroot_list
#
# You may activate the "-R" option to the builtin ls. This is disabled by
# default to avoid remote users being able to cause excessive I/O on large
# sites. However, some broken FTP clients such as "ncftp" and "mirror" assume
# the presence of the "-R" option, so there is a strong case for enabling it.
#ls_recurse_enable=YES
#
# When "listen" directive is enabled, vsftpd runs in standalone mode and
# listens on IPv4 sockets. This directive cannot be used in conjunction
# with the listen_ipv6 directive.
listen=NO
#
# This directive enables listening on IPv6 sockets. By default, listening
# on the IPv6 "any" address (::) will accept connections from both IPv6
# and IPv4 clients. It is not necessary to listen on *both* IPv4 and IPv6
# sockets. If you want that (perhaps because you want to listen on specific
# addresses) then you must run two copies of vsftpd with two configuration
# files.
# Make sure, that one of the listen options is commented !!
listen_ipv6=YES

pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES
pasv_min_port=4444
pasv_max_port=4455
allow_writeable_chroot=YES
```

