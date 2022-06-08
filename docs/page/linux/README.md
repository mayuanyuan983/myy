# Linux  

## 复制桌面快捷方式

```shell
#!/bin/bash
desktop_path=$(xdg-user-dir DESKTOP)
unalias cp #临时修改别名
cp -f aa.desktop $desktop_path/aa.desktop
alias cp='cp -i'
```

## 解压覆盖到指定文件夹

```shell
unzip -o -d /usr/local/ temp.zip
```

