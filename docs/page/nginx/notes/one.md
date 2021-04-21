# nginx.conf

## 前端静态文件nginx.conf配置

```
server {
  listen 80;
  server_name shanyue.tech; 

  location / {
    # 避免非root路径404
    try_files $uri $uri/ /index.html;
  }

  # 解决跨域
  location /api {
    proxy_pass http://api.shanyue.tech;
  }

  # 为带 hash 值的文件配置永久缓存
  location ~* \.(?:css|js)$ {
      try_files $uri =404;
      expires 1y;
      add_header Cache-Control "public";
  }

  location ~ ^.+\..+$ {
      try_files $uri =404;
  }
}
```

