# Java

COALESCE(SUM(t.anum),0) AS anum改成这样，初始为0，就永远有值，不为null



<img :src="$withBase('/img/Java学习路线图.jpg')" alt="dock">

## Basic鉴权

采用IETF2617所定义的HTTP basic鉴权机制，Authorization头域填写要求如下：

Authorization: Basic <base64 encoded (user-pass)>

鉴权参数计算如下：

符合HTTP RFC2616要求，填写示例如下：

Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

其中userid为Aladdin，password为open sesame

```xml
		<dependency>
			<groupId>commons-codec</groupId>
			<artifactId>commons-codec</artifactId>
			<version>1.9</version>
		</dependency>
```

`new String(Base64.encodeBase64(userPass.getBytes("UTF-8")))`



##  说明

M/O(*Mandatory* or Optional)：“*Mandatory*”表示此查询字段必填；“Optional”表示此查询字段可选.

