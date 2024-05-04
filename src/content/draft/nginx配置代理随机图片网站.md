---
title: nginx配置代理随机图片网站
description: ''
pubDate: 2023/12/30 21:12:10
updatedDate: 2024/01/08 06:21:41
tags:
    - nginx
category: nginx
author: NPMRUN
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/70076727_p0.webp
comment: true
chinese: true
---

本次的目标，是代理 https://img.r10086.com/ 这个网站，即代理其全部的接口，使得访问我这里的api跟访问它的api是一致的，例如：https://api.r10086.com/图包/少女写真1/COS-猫ソロ/091_u89.jpg 这个接口跟 https://api.r10086.com/图包/少女写真1/COS-猫ソロ/091_u89.jpg 是一致的。为了加速图片的访问，同时增加一层缓存层，如果访问我的接口存在缓存的话，即马上返回，如果不存在缓存，则我的服务器会访问源站，就会慢一点。

这里记录一下实现的方法，以后可能会用到,这里也是存在着一些nginx的知识点。

nginx可以配置代理缓存，因为我的服务器是宝塔管理的，其配置在`/www/server/nginx/conf/proxy.conf`，参照修改：

```
proxy_temp_path /www/server/nginx/proxy_temp_dir;
proxy_cache_path /www/server/nginx/proxy_cache_dir levels=1:2 keys_zone=cache_one:20m inactive=1d max_size=5g;
proxy_cache_path /www/server/nginx/proxy_cache_dir_pic levels=1:2 keys_zone=cache_pic:20m inactive=1d max_size=10g;
client_body_buffer_size 512k;
proxy_connect_timeout 60;
proxy_read_timeout 60;
proxy_send_timeout 60;
proxy_buffer_size 32k;
proxy_buffers 4 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;
proxy_next_upstream error timeout invalid_header http_500 http_503 http_404;
proxy_cache cache_one;
```

```xml
location /r10086/ {
        log_not_found off;
        access_log off;
        expires 7d;
        proxy_pass https://api.r10086.com/;
        proxy_set_header Host api.r10086.com;
        proxy_set_header Referer https://api.r10086.com/;
        # proxy_set_header X-Real-IP $remote_addr;
        # more_clear_headers location;
        more_set_headers 'location: /r10086$sent_http_location';
        # proxy_set_header REMOTE-HOST $remote_addr;
        # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_ssl_server_name on;
        
        # allow 100.110.15.16;
        # allow 100.110.15.17;
        # allow 100.110.15.18;
        # allow 127.0.0.1;
        # allow 120.229.53.88;
        # deny all;
        
        # header中存在etag才缓存，否则就不缓存
        # 根据条件绕过缓存
        if ($http_etag = "") {
            set $bypass_cache 1;
        }
        
        set $is_file 0;
        if ($uri ~* \.(jpg|png|jpeg|webp|gif|svg)$) {
            set $is_file 1;
        }
        # 检查是否不存在 ETag，并设置 Cache-Control 头
        if ($is_file != 1) {
          set $cache_control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        }
        add_header Cache-Control $cache_control;
        
        # 检查是否需要绕过缓存
        proxy_cache_bypass $bypass_cache;
        
        proxy_cache cache_pic;
        proxy_cache_valid 200 302 1d ;
        proxy_cache_valid 404 10m;
        proxy_cache_valid any 1h;
        proxy_no_cache $sent_http_location;
        proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
        }
```