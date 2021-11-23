# Spring Boot常用设置

## 热部署

在pom.xml中添加依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>


       <build>
            <plugins>
                <plugin>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-maven-plugin</artifactId>
                    <configuration>
                        <fork>true</fork> <!-- IDEA,如果没有该配置，devtools不会生效 还需要开启自动编译Build project automatically -->
                        <addResources>true</addResources>
                    </configuration>
                </plugin>
            </plugins>
        </build>
```



# 捕获异常并回滚

```java
	@Transactional(rollbackFor = Exception.class)
	public void test() {
		try {
			updata();
			updata2();
		} catch (Exception e) {
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			// 如果updata2()抛了异常,updata()会回滚,不影响事物正常执行
		}
	}
```

若缺失依赖

```xml
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
		</dependency>
```



## web依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

## mybatis 的mapperXml配置

pom.xml

```xml
    <build>
        <!--resources配置解决mybatis 的mapperXml配置在java路径不被扫描的问题 -->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
            </resource>
        </resources>
    </build>
```

## maven项目打包配置

pom.xml

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <!--跳过测试 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <skipTests>true</skipTests>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

