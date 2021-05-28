# Netty



### Channel  数据传输流

Channel，表示一个连接，可以理解为每一个请求，就是一个Channel。

ChannelHandler，核心处理业务就在这里，用于处理业务请求。

ChannelHandlerContext，用于传输业务数据。

ChannelPipeline，用于保存处理过程需要用到的ChannelHandler和ChannelHandlerContext。

### ByteBuf  存储字节的容器

### Codec  编码/解码器

HttpRequestDecoder和HttpResponseEncoder

通过Netty发送和接收一个消息的时候，就会发生一次数据转换，入站消息会被解码，也就是从字节转换为原本的形式，如果是出站消息，就会从一种形式变成字节，这个就是编码，编解码的根本原因就是因为网络数据就是一系列的字节

## ServerBootstrap

ServerBootstrap负责初始化netty服务器，并且开始监听端口的socket请求。

## NioEventLoopGroup

EventLoop如同它的名字，它是一个无限循环（Loop），在循环中不断处理接收到的事件（Event）

Netty线程模型的基石是建立在EventLoop上的，从设计上来看，EventLoop采用了一种协同设计，它建立在两个基本的API之上：Concurrent和Channel，也就是并发和网络。并发是因为它采用了线程池来管理大量的任务，并且这些任务可以并发的执行。其继承了EventExecutor接口，而EventExecutor就是一个事件的执行器。另外为了与Channel的事件进行交互，EventLoop继承了EventLoopGroup接口。一个详细的EventLoop类继承层次结构如下：

**一个Netty服务端启动时，通常会有两个NioEventLoopGroup：**一个是监听线程组，主要是监听客户端请求，另一个是工作线程组，主要是处理与客户端的数据通讯。

```
NioEventLoopGroup bossGroup = new NioEventLoopGroup();//处理连接工作
NioEventLoopGroup workerGroup = new NioEventLoopGroup();//数据处理
```

**Netty客户端只有一个NioEventLoopGroup**，就是用来处理与服务端通信的线程组。

```
NioEventLoopGroup workerGroup = new NioEventLoopGroup();
```

**NioEventLoopGroup可以理解为一个线程池，内部维护了一组线程，每个线程负责处理多个Channel上的事件，而一个Channel只对应于一个线程，这样可以回避多线程下的数据同步问题**

## ServerBootstrap的childHandler()与handler()的区别

ServerBootstrap的childHandler()与handler()添加的handlers是针对不同的EventLoopGroup起作用：

通过handler添加的handlers是对bossGroup线程组起作用

通过childHandler添加的handlers是对workerGroup线程组起作用

## Bootstrap的handler()

客户端Bootstrap只有handler()方法，因为客户端只需要一个事件线程组

## Netty启动流程

启动流程大概可以分为三个步骤：初始化，注册，绑定。

1).初始化主要的过程：创建Channel对象，为Channel配置属性及选项，添加对应的handler。

2).注册的主要过程：将channel与eventLoop绑定；调用内部封装的ServerSocketChannel注册interestOps；注册完成后，调用pipeline产生对应的事件（fireChannelRegister，以及可能的Actived事件）

3).绑定的主要过程：调用内部封装的ServerSocketChannel绑定端口，绑定成功后（fireChannelActived）

## Netty的退出

常规的demo级别的netty服务端的代码写法是这样的：

```
try {
                //创建并初始化 Netty 服务端辅助启动对象 ServerBootstrap
                ServerBootstrap serverBootstrap = RpcServer.this.initServerBootstrap(bossGroup, workerGroup);
                //绑定对应ip和端口，同步等待成功
                ChannelFuture future = serverBootstrap.bind(port).sync();
                LOGGER.info("rpc server 已启动，端口：{}", port);
                //等待服务端监听端口关闭
                future.channel().closeFuture().sync();
            } catch (InterruptedException i) {
                LOGGER.error("rpc server 出现异常，端口：{}, cause:", port, i.getMessage());
            } finally {
                //优雅退出，释放 NIO 线程组
                workerGroup.shutdownGracefully();
                bossGroup.shutdownGracefully();
            }
```

在这里面future.channel().closeFuture().sync();这个语句的主要目的是，方便测试，方便写一个非springboot的demo,比如一个简单地junit test方法，closeFuture().sync()可以阻止junit test将server关闭，同时停止test应用的时候也不需要手动再调用关闭服务器的方法workerGroup.shutdownGracefully()...。这样设计在测试时省心。

但是，当将nettyserver联系到springboot应用的启动时，例如nettyserver设置为@Component,当springboot扫描到nettyserver时，springboot主线程执行到nettyserver的postconstruct注解的方法，然后发生了

future.channel().closeFuture().sync();
这样导致springboot主线程阻塞，无法继续加载剩下的bean,
更糟糕的是，如果springboot还添加了springboot-web的依赖（自带tomcat容器），那么被阻塞后将无法启动tomcat servlet engine和webapplicationcontext.

所以不能简单地在nettyserver中的构造方法/init方法中写future.channel().closeFuture().sync();和workerGroup.shutdownGracefully().

只需在构造方法/init方法中bootstrap.bind(port),这是异步的，不会阻塞springboot主线程。

而将stop方法单独抽取出来。

需要注意的是，即使直接关闭springboot应用，不手动调用上面的stop方法，nettyserver也会将之前绑定的端口解除，为了保险起见，可以将stop方法添加@predestroy注解

## sync和syncUninterruptibly

sync()：等待Future直到其完成，如果这个Future失败，则抛出失败原因；

syncUninterruptibly()：不会被中断的sync()；

## 处理器

作用：主要用于处理网络I/O事件。例如记录日志、对消息进行编解码等。

netty发送和接收数据handler处理器 主要是继承 SimpleChannelInboundHandler 和 ChannelInboundHandlerAdapter 

　　一般用netty来发送和接收数据都会继承SimpleChannelInboundHandler和**ChannelInboundHandlerAdapter**这两个抽象类，那么这两个到底有什么区别呢？

　　其实用这两个抽象类是有讲究的，在客户端的业务Handler继承的是**SimpleChannelInboundHandler**，而在服务器端继承的是**ChannelInboundHandlerAdapter**。

　　最主要的区别就是SimpleChannelInboundHandler在接收到数据后会自动release掉数据占用的Bytebuffer资源(自动调用Bytebuffer.release())。而为何服务器端不能用呢，因为我们想让服务器把客户端请求的数据发送回去，而服务器端有可能在channelRead**方法**返回前还没有写完数据，因此不能让它自动release。

**handler处理器 内置 方法**

#### channelActive

通道激活时触发，当客户端connect成功后，服务端就会接收到这个事件，从而可以把客户端的Channel记录下来，供后面复用

#### channelRead

这个必须用啊，当收到对方发来的数据后，就会触发，参数msg就是发来的信息，可以是基础类型，也可以是序列化的复杂对象。

#### channelReadComplete

channelRead执行后触发

#### exceptionCaught

出错是会触发，做一些错误处理

```
/**
 *  netty服务器的监听 处理器
 * 
 * @author flm 2017年10月27日
 */
public class IOHandler extends ChannelInboundHandlerAdapter {

    private static Logger log = Logger.getLogger(IOHandler.class);

    //netty AttributeKey 相对于 web session【重要】
    public static final AttributeKey<DeviceSession> KEY = AttributeKey.valueOf("IO"); 

    private Producer producer;
    
    
    public IOHandler(Producer producer){
        this.producer=producer;
    }

/**
     * 读取数据
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        
        DeviceSession session = ctx.channel().attr(KEY).get();     // 检测是否 自己注册的 客户端
        
        ByteBuf buffer=(ByteBuf) msg;
        
        if (buffer == null||session == null) {
            closeConnection(ctx); // 关闭连接
        }
        
        MsgEntity msgEntity = new MsgEntity(buffer); // 解码  buffer 封装  msgEntity
        log.info("# Accept Client data :"+msgEntity.toString());
        
        if (MsgType.UNKNOW == msgEntity.getMsgType()) {
            log.info("# 客户端 发送数据 类型未定义... :"+msgEntity.toString());
            return;
        }
        
        if(!session.isActivity()){
            session.setActivity(true);
            session.setImei(msgEntity.getImei());
            SessionManager.getSingleton().addClient(session);
        }
        producer.putData(msgEntity);
        
    }

    
    
    /**
     * 客户端 注册
     */
    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        super.channelRegistered(ctx);
        
        log.info(String.format("# client registered...：   %s ...", ctx.channel()));
        
        DeviceSession session = new DeviceSession(ctx.channel());
        // 绑定客户端到SOCKET
        ctx.channel().attr(KEY).set(session);
    }

    
    /**
     * 客户端 失去连接
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception
    {
        super.channelInactive(ctx);
        
        log.info(String.format("# client out... : %s", ctx.channel()));
        DeviceSession session = ctx.channel().attr(KEY).getAndSet(null);
        
        // 移除  session 并删除 该客户端
        SessionManager.getSingleton().removeClient(session, true);
        
        if(session.getDeviceID() != null)
        {
          //  producer.onData(new Request(new RootMessage(MessageType.LOGOUT, null, null), session));
        }
        
    }

   
    /**
     * 心跳机制  用户事件触发
     */
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception
    {
        if (evt instanceof IdleStateEvent)
        {
            IdleStateEvent e = (IdleStateEvent) evt;
            
            //检测 是否 这段时间没有和服务器联系
            if (e.state() == IdleState.ALL_IDLE)
            {
                //检测心跳
                checkIdle(ctx);
            }
        }
        
        super.userEventTriggered(ctx, evt);
    }
    

  /**
     * 报错 处理事件
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
            throws Exception {
        
        log.error("# 客户端连接  Netty 出错...");
        cause.printStackTrace();
        //关闭连接
        closeConnection(ctx);
    }
```

## write

从性能角度考虑，为了防止频繁地唤醒Selector进行消息发送，Netty的write方法只是把待发送的消息放到发送缓冲数组，再通过调用flush方法，将发送缓冲区中的消息全部写到SoceketChannel中

## 服务关闭

ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);

当出现 INACTIVE 的时候意味着该通道已经关闭

.addListener(ChannelFutureListener.CLOSE) 读完信息之后，就会关闭该通道

 **Channel 是用于服务端和客户端通信的，所以无论哪一方进行了关闭操作，该 Channel 都会关闭的**

ctx.write(in);*//写入channel 然后将这些信息返回给发送者*

*//将所有的待审的消息发送，然后冲刷 并且关闭通道 后面那个监听 只是监听通道是否关闭*        ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);

