# Nginx  

```sh
#查看npm的prefix和cache路径配置信息
npm config get cache
npm config get prefix

#设置路径
npm config set prefix "D:\ProgramFile\nodejs\node_modules\node_global"
npm config set cache "D:\ProgramFile\nodejs\node_modules\node_cache"
```



```sh
#查看npm配置信息
npm config list
```

## npm 安装包报错 rollbackFailedOptional

设置的代理错误，删除即可

```sh
npm config rm proxy
npm config rm https-proxy
```

