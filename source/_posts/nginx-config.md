---
title: nginx配置
date: 2021-08-22 13:32
tags:
  - nginx
---

```
/etc/nginx

├── conf.d
├── nginx.conf
├── sites-available
│   └── default
└── sites-enabled
    └── default -> /etc/nginx/sites-available/default

```

## 配置概览

```bash

# nginx.conf

user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
  worker_connections 768;
  # multi_accept on;
}

http {
  ##
  # Basic Settings
  # 基础配置部分
  ##
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  # server_tokens off;
  # server_names_hash_bucket_size 64;
  # server_name_in_redirect off;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  ##
  # SSL Settings
  ##

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

  ##
  # Logging Settings
  ##

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  ##
  # Gzip Settings
  ##

  gzip on;

  # gzip_vary on;
  # gzip_proxied any;
  # gzip_comp_level 6;
  # gzip_buffers 16 8k;
  # gzip_http_version 1.1;
  # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  ##
  # Virtual Host Configs
  ##

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}

```

## 全局变量

```bash
$remote_addr            # 获取客户端ip
$binary_remote_addr     # 客户端ip（二进制)
$remote_port		    # 客户端port，如：50472
$remote_user		    # 已经经过Auth Basic Module验证的用户名
$host			        # 请求主机头字段，否则为服务器名称，如:blog.sakmon.com
$request		        # 用户请求信息，如：GET ?a=1&amp;b=2 HTTP/1.1
$request_filename   	# 当前请求的文件的路径名，由root或alias和URI request组合而成，如：/2013/81.html
$status			        # 请求的响应状态码,如:200
$body_bytes_sent        # 响应时送出的body字节数数量。即使连接中断，这个数据也是精确的,如：40
$content_length	        # 等于请求行的“Content_Length”的值
$content_type	        # 等于请求行的“Content_Type”的值
$http_referer	        # 引用地址
$http_user_agent        # 客户端agent信息,如：Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36
$args		            # 与$query_string相同 等于当中URL的参数(GET)，如a=1&amp;b=2
$document_uri	        # 与$uri相同  这个变量指当前的请求URI，不包括任何参数(见$args) 如:/2013/81.html
$document_root	        # 针对当前请求的根路径设置值
$hostname	            # 如：centos53.localdomain
$http_cookie	        # 客户端cookie信息
$cookie_COOKIE	        # cookie COOKIE变量的值
$is_args	            # 如果有$args参数，这个变量等于”?”，否则等于”"，空值，如?
$limit_rate	            # 这个变量可以限制连接速率，0表示不限速
$query_string	        # 与$args相同 等于当中URL的参数(GET)，如a=1&amp;b=2
$request_body	        # 记录POST过来的数据信息
$request_body_file	    # 客户端请求主体信息的临时文件名
$request_method	        # 客户端请求的动作，通常为GET或POST,如：GET
$request_uri	        # 包含请求参数的原始URI，不包含主机名，如：/2013/81.html?a=1&amp;b=2
$scheme		            # HTTP方法（如http，https）,如：http
$uri			        # 这个变量指当前的请求URI，不包括任何参数(见$args) 如:/2013/81.html
$request_completion	    # 如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)，如：OK
$server_protocol	    # 请求使用的协议，通常是HTTP/1.0或HTTP/1.1，如：HTTP/1.1
$server_addr		    # 服务器IP地址，在完成一次系统调用后可以确定这个值
$server_name		    # 服务器名称，如：blog.sakmon.com
$server_port		    # 请求到达服务器的端口号,如：80

```

## 全局块

```conf
#定义Nginx运行的用户和用户组
user nginx nginx;

#nginx进程数，建议设置为等于CPU总核心数
worker_processes 8;

#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
error_log /var/log/nginx/error.log info;

#进程文件
pid /var/run/nginx.pid;

#nginxworker最大打开文件数，可设置为系统优化后的ulimit -n的结果
worker_rlimit_nofile 65535;

```

## events 块

```conf
events {
  #epoll模型是Linux 2.6以上内核版本中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型
  use epoll;

  #单个worker进程最大连接数（nginx最大连接数=worker连接数*进程数）
  worker_connections 65535;
}
```

## http 块

这部分应该是 Nginx 服务器配置中最频繁的部分；代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。

### http 全局配置

```conf
http {
  include mime.types; #nginx支持的媒体类型库文件
  default_type application/octet-stream; #默认媒体文件类型
  #charset utf-8; #默认编码
  server_names_hash_bucket_size 128; #服务器名字的hash表大小
  client_header_buffer_size 32k; #上传文件大小限制
  sendfile on; #开启高效文件传输模式，实现内核零拷贝
  autoindex off; #开启目录列表访问，适合下载服务器，默认关闭。
  keepalive_timeout 120; #长连接超时时间，单位是秒
}
```

### server 配置

server 块的配置，即虚拟主机的配置

```conf
#网站配置区域
server  {
  #默认监听80端口
  listen 80;
  #提供服务的域名主机名
  server_name www.lulu.com;    
  location / {
    #站点根目录（这里html是相对路径，默认网站根目录为：/usr/local/nginx/html）
    root html;
    index index.thml index.htm;  #默认首页文件，多个用空格分开
  }
  location = /50x.thml {
    root    html; #指定对应目录
  }
  error_page 500 502 503 504  /50x.html;    #出现对应http状态码时，使用50x.html回应客户
}
```

#### location

```bash
location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ] 
}

location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ] 
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ] 
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ] 
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ] 
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ] 
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ] 
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ] 
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
  [ configuration H ] 
}

location ~* /js/.*/\.js
```

- `=` 开头表示精确匹配。如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。
- `^~` 开头表示uri以某个常规字符串开头，不是正则匹配
- `~` 开头表示区分大小写的正则匹配
- `~*` 开头表示不区分大小写的正则匹配
- `/` 通用匹配, 如果没有其它匹配,任何请求都会匹配到

##### location匹配优先级

(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~* 正则顺序) > (location 部分起始路径) > (/)

