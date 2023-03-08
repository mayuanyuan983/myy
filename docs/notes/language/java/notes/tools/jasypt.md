# Jasypt

::: tip 说明

jasypt可以对配置文件中的明文密码进行加密的工具

:::

## 使用方式

### pom文件引入依赖

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>1.16</version>
</dependency>
```

#### 配置文件加入密钥配置

```yml
#jasypt加密
jasypt:
  encryptor:
    password: mysalt #密钥
    #algorithm: PBEWithMD5AndDES #加密算法 可以不写 不写就是默认这个
```

#### 加密测试类代码

```java
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

public class EncryptTests {

    private static final String PASSWORD_INFO = "mysalt";

    private static final String ALGORITHM_INFO = "PBEWithMD5AndDES";
    
    private static final String text = "123456";//待加密文本

    public static void main(String[] args) {
        EncryptTests encryptTests = new EncryptTests();
        encryptTests.encryptPwd();
    }

    public void encryptPwd() {
        StandardPBEStringEncryptor standardPBEStringEncryptor = new StandardPBEStringEncryptor();
        //配置文件中配置如下的算法 不写就是默认的
//        standardPBEStringEncryptor.setAlgorithm(ALGORITHM_INFO);
        //配置文件中配置的password
        standardPBEStringEncryptor.setPassword(PASSWORD_INFO);
        //要加密的文本
        String password = standardPBEStringEncryptor.encrypt(text);
        //将加密的文本写到配置文件中
        System.out.println("密文=" + password);

        //要解密的文本
        String password2 = standardPBEStringEncryptor.decrypt(password);
        //解密后的文本
        System.out.println("明文=" + password2);
        
        System.out.println("ENC(" + password + ") " + "#明文" + password2);
    }
}
```

### 配置使用

```yml
	username: root
	password: ENC(U5XlkIYdaRcOUpsOz+Wsog==) #明文为root
```

## 注意

3.0.0 以后更改了加密算法

需要设置iv-generator-classname: org.jasypt.iv.NoIvGenerator

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

### 配置文件

```yml
#jasypt加密
jasypt:
  encryptor:
    password: mysalt #密钥
    #algorithm: PBEWithMD5AndDES #加密算法 可以不写 不写就是默认这个
    iv-generator-classname: org.jasypt.iv.NoIvGenerator
```

### 密钥配置其他方式

- 启动脚本 -Djasypt.encryptor.password=mysalt
- 环境变量 
- 程序启动类

```java
//程序启动类里
/**  配置加解密跟秘钥，与配置文件的密文分开放  */
System.setProperty("jasypt.encryptor.password", "mysalt");
```

### 修改密文前后缀

如果想修改密文的前后缀，可以进行如下的配置

```yml
#jasypt加密
jasypt:
  encryptor:
    password: mysalt #密钥
    #algorithm: PBEWithMD5AndDES #加密算法 可以不写 不写就是默认这个
    property:
      prefix: "ENC@["
      suffix: "]"
```





