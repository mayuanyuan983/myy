# oracle连接数配置

### 1.连接

连接Linux服务器，切换oracle用户，使用系统用户（sys）登入oracle数据库

`su - oracle`

`sqlplus / as sysdba`

### 2.查看连接数

查看当前oracle数据库进程数（连接数）+ sessions数 和 进程数（连接数）上限 + sessions数上限

> SQL> select count(*) from v$process;  //当前oracle数据库进程数（连接数）
>
> SQL> select count(*) from v$session;  //当前oracle数据库sessions数
>
> SQL> select value from v$parameter where name = 'processes';  //进程数（连接数）上限
>
> SQL> select value from v$parameter where name = 'sessions';  //sessions数上限
>
> SQL> show parameter processes  //当前数据库进程参数详情
>
> SQL> show parameter sessions  //当前数据库进程参数详情

### 3.修改进程数（连接数）+ sessions上限

> SQL> alter system set processes=300 scope=spfile;
>
> SQL> alter system set sessions=300 scope=spfile;

引用别人关于spfile的解释：

注：此处如果提示错误：ORA-32001，则说明DB是以pfile启动的，需要修改为用spfile启动，具体修改方法如下：

> SQL>show parameter spfile查一下是使用什么文件启动的。
>
> SQL> show parameter spfile;
>
> 要动态修改一定要用spfile启动。如果现在是用pfile启动，可以这样切换成spfile启动：
>
> SQL>create spfile from pfile;
>
> SQL>shutdown immediate;
>
> SQL>startup;
>
> 用show paramer spfile 查看如果values对应有值，表示是spfile启动的。否则就是pfile启动的。

### 4. 重启数据库，使更改生效

> SQL> alter system checkpoint
>
> SQL> shutdown immediatec
>
> SQL> startup

