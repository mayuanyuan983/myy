[使用sortablejs复原上次移动](https://www.jianshu.com/p/64e1adc224e3)

[Element表格拖拽排序](https://www.jianshu.com/p/ca6e10dd404f)

[vue 在方法的默认参数中加入自定义参数](https://blog.csdn.net/qq_36030737/article/details/124165069)

[el-tooltip配合el-button禁用时显示提示](https://blog.csdn.net/FellAsleep/article/details/127284990)

[vue使用sortablejs结合element Table实现拖拽](https://blog.csdn.net/qq_55547532/article/details/125743237)

<br/>

[electron 无法安装](https://blog.csdn.net/qq_40064118/article/details/127409963)

[Object.fromEntries is not a function electron-vue报错](https://blog.csdn.net/y_k_1_2_3_4/article/details/126479427)

[使用file-saver导出文件](https://blog.csdn.net/guizi0809/article/details/119421502)

[vue+element-ui中的el-table-column使用v-if导致位置错乱的现象](https://blog.csdn.net/xzx66666/article/details/124888564)

[element-ui upload accept=““ 不起作用(关于element-u上传文件类型限制)](https://blog.csdn.net/qq_42374233/article/details/109350815)

<br/>

[vue中element-ui中el-upload上传方式使用drag拖拽上传无效](https://blog.csdn.net/qq_38916157/article/details/103873802)

<br/>

[动态表单校验](https://www.jianshu.com/p/2d178f8761e5)

注意：rule里面必须配置一个空数组，不然动态设置没用

<br/>

[JS中new Date()获取小时多8小时问题](https://www.jianshu.com/p/57c963596434)

<br/>

npm install sass-loader@7.3.1
npm rebuild node-sass


https://blog.csdn.net/hochenchong/article/details/103339457

https://blog.csdn.net/adojayfan/article/details/125725170

https://github.com/tporadowski/redis/releases/tag/v5.0.9

http://events.jianshu.io/p/ccbde054c47d

[删除重复数据-MYSQL](https://blog.csdn.net/eagle89/article/details/128512054)

[分页数计算](https://www.cnblogs.com/sunny3158/p/14142803.html)

<br/>

[JdbcTemplate中执行结果包含内嵌式实体](https://blog.csdn.net/qq_24114893/article/details/99541761)
[MySQL查询某个表中的所有字段并通过逗号分隔连接](https://blog.csdn.net/qq_35427589/article/details/121767760)
[MiniIO 通过API调用时报签名错误](https://blog.csdn.net/summer_fish/article/details/113525911)

<br/>

@Query 参数可能为空

```
@Query("select count(1) from TransLimit t where t.deviceType=:deviceType and (:id is null or t.id <> :id) ")
int countByDeviceType(@Param("deviceType") String deviceType, @Param("id") String id);
```

https://www.cnblogs.com/sweetchildomine/p/7807868.html

[mybatis-plus循环依赖](https://blog.csdn.net/weixin_45812467/article/details/123985626)

<br/>

[Spring—@Value在static中引用

<br/>

[线程池监控 - Hippo4J Web](http://console.hippo4j.cn/index.html#/hippo4j/dynamic/thread-pool/monitor)

[MyBatisPlus（六）软删除（逻辑删除）](https://blog.csdn.net/gozhuyinglong/article/details/108733229)

[Maven Repository](https://mvnrepository.com)

[swagger2 注解说明_](https://blog.csdn.net/xiaojin21cen/article/details/78654652)

3.svn

http://10.0.2.28/repos/system/Hulk2/JPRS/nobase/project/code/trunk/jprs

http://10.0.2.28/repos/system/ECFC3.0/nobase/project/code/ecfc-v3

```
  select t_tables.table_name,
         t_column.column_name,
         t_column.data_length,t_column.CHAR_LENGTH,t_column.CHAR_USED
    from user_tab_columns t_column, user_tables t_tables
   where t_column.table_name = t_tables.table_name
     --and t_tables.table_name like '%BM_B%'     -- 模糊匹配的表名
     --and t_column.data_length = 32           -- 可根据字段长度
    -- and t_column.data_type = 'VARCHAR2'        -- 可根据字段类型
     -- and t_tables.table_name = 'RP_NW_HWXSYBG' -- 具体那张表
     --and t_column.column_name not LIKE '%ID%' --过滤字段
     --and t_column.column_name not LIKE '%STATUS%' --过滤字段
         and t_tables.table_name = 'BASE_AUDIT'
         
         
           select t_tables.table_name,
         t_column.column_name,
         t_column.data_length,
         'alter table ' || t_column.table_name || ' modify ' || t_column.column_name ||
         ' varchar2(32);' as alter_sqlstr
    from user_tab_columns t_column, user_tables t_tables
   where t_column.table_name = t_tables.table_name
     --and t_tables.table_name like '%BM_B%'     -- 模糊匹配的表名
     --and t_column.data_length = 32           -- 可根据字段长度
     and t_column.data_type = 'VARCHAR2'        -- 可根据字段类型
     -- and t_tables.table_name = 'RP_NW_HWXSYBG' -- 具体那张表
     --and t_column.column_name not LIKE '%ID%' --过滤字段
     --and t_column.column_name not LIKE '%STATUS%' --过滤字段
         and t_tables.table_name = 'BASE_AUDIT'
```


## idea

https://www.cnblogs.com/xiegongzi/p/16323735.html

https://blog.csdn.net/win7system/article/details/83508313

## 插件

#### CamelCase插件

大小写驼峰下划线转换 shit+alt+u  配置：Editor->Camel Case

#### mybatisLogFormat

#### Grep Console

#### GsonFormatPlus

json字符串转对象

#### mybatisX

#### GenerateAllSetter

一键生成setter
快捷键：Alt+Enter

Alibaba Java Coding Guidelines

Rainbow Brackets(多彩花括号)

Maven Helper

依赖冲突

smart tomcat

## node

npm config set registry https://registry.npm.taobao.org

## vscode

HTML Snippets

Auto Close Tag

Auto Rename Tag

Bracket Pair Colorization Toggler

Npm Intellisense

vscode-icons

gitHub Pull requests

Beautify

Vetur

JavaScript (ES6) code snippets

<br/>
