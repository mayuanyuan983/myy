# FAQ

## @RequestParam请求接收数组格式

```java
@RequestMapping(value = "/test")
public void testRequestParam(@RequestParam(value = "params[]", required = false) String[] params){
    System.out.println(Arrays.toString(params));
}
```

