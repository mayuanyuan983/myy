# CenterOs7安装gcc,gc++

## 离线安装

1.上传依赖包

2.到目录执行

`rpm -Uvh *.rpm --nodeps --force`

3.验证

`gcc -v`

`g++ -v`

## 联网环境

使用yum安装gcc

`yum -y install gcc gcc-c++ kernel-devel` 

//安装gcc、c++编译器以及内核文件