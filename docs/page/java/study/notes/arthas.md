# arthas 

教程
https://arthas.aliyun.com/doc/trace.html#%E5%90%AF%E5%8A%A8-demo


启动
java -jar arthas-boot.jar
输入要监控的Java应用编号
跟踪方法耗时
执行
trace com.eastcom.ecfc.controller.WorkingDaysDeclareControl getUsersByProId
执行方法
方法结束后会打印执行时间

## 学习

-Xss：规定了每个线程虚拟   机栈及堆栈的大小，一般情况下，256k是足够的，此配置将会影响此进程中并发线程数的大小。

-Xms：表示初始化JAVA堆的大小及该进程刚创建出来的时候，他的专属JAVA堆的大小，一旦对象容量超过了JAVA堆的初始容量，JAVA堆将会自动扩容到-Xmx大小。

-Xmx：表示java堆可以扩展到的最大值，在很多情况下，通常将-Xms和-Xmx设置成一样的，因为当堆不够用而发生扩容时，会发生内存抖动影响程序运行时的稳定性。