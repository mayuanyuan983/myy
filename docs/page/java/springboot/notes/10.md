# 构建一个SpringBoot项目

## 1.进入官网

[官网](http://start.spring.io/)

选择项目类型（Maven Project/Gradle Project），语言类型（Java/Kotlin/Groovy），Spring Boot的版本；

此次选择均为默认，Spring Boot版本使用了2.2.6，Java版本为8，

打包方式为Jar。

点击下方“Generate Project”按钮即可把新建的工程压缩包下载到本地



## 2.导入项目

打开STS，导入maven项目

DemoApplication.java是Spring Boot的启动类

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
```

其核心是@SpringBootApplication注解。

@SpringBootApplication = (默认属性)@Configuration + @EnableAutoConfiguration + @ComponentScan。

@Configuration：创建一个简单的Spring配置类，可以用来替代相应的xml配置文件。

@EnableAutoConfiguration： 自动配置Spring的上下文。

@ComponentScan：自动扫描指定包下的全部标有@Component的类，并注册成bean，包括@Component下的子注解@Service，@Repository，@Controller。

## 3.编写Controller层

```java
package com.example.demo.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@RequestMapping("/springboot")
public class HelloController {
	@RequestMapping("/hello")
	public String hello() {
		return "Hello Spring Boot";
	}
}
```


## 4.项目启动

DemoApplication.java右键 -> Run As - > Spring Boot App

## 5.测试接口

PostMan发送POST/GET请求，验证返回结果。

