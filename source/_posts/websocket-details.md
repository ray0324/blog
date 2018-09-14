---
title: WebSocket详解
date: 2018-09-10 13:57
tags:
  - websocket
---

## 协议简介

[WebSocket](http://tools.ietf.org/html/rfc6455)是全双工、双向连接的通信协议。利用Websocket协议，我们可以可以很容易实现双向通信。

## 握手

WebSocket协议的握手采用http请求，首先由客户端发起一个一个http的GET请求

### 2.1 请求报文

```

GET / HTTP/1.1
Host: 127.0.0.1:5001
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36
Upgrade: websocket
Origin: file://
Sec-WebSocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7
Sec-WebSocket-Key: GmWO5Q6xbLV6omMei0ZYmQ==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

```

我们提取一下这个握手请求中关键部分：

```

GET / HTTP/1.1
Host: 127.0.0.1:5001
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: GmWO5Q6xbLV6omMei0ZYmQ==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

```

服务端通过识别`Connection: Upgrade`和`Upgrade: websocket`字段来确定这是一个客户端请求建立Websocket链接，此时服务端需要回应客户端的握手请求。

### 2.2 响应报文

响应报文的关键部分：

```

HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: eXzH3FMcn1/SVIsQt1CY911cvSw=

```
其中`Sec-WebSocket-Accept`字段是服务端根据客户端握手请求报文中`Sec-WebSocket-Key`字段值进行特定的计算而得到的，其计算方式如下

```js

crypto.createHash('sha1').update('GmWO5Q6xbLV6omMei0ZYmQ=='+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')

```

即先将`Sec-WebSocket-Key`的值与`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`这个GUID字符串进行拼接，然后算出sha1值，最后转成base64编码。

当客户端收到以上握手响应报文之后，握手就成功建立，客户端与服务端就可以进行WebSocket通信了。



## 数据帧

```

 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+

```

未完待续。。。