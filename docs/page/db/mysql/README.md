# Mysql

## windows启动mysql

启动命令 `net start MySQL57`

停止命令 `net stop MySQL57`

cmd发生系统错误5 拒绝访问解决办法
以管理员身份运行，右击cmd.exe，选择右下角的高级，在“用管理员身份运行前打勾”

## 查看mysql版本

```sql
show variables like '%version%';
#查看数据库版本
select VERSION();
```

## mysql修改密码

### 密码修改

`mysqladmin -u root -p password "密码"`

回车后输入原密码

### 远程授权密码修改

`mysql -uroot -p`

`mysql>set password for root@'%' = password('密码')`





