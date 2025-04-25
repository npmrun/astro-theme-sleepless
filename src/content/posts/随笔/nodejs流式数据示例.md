---
title: nodejs流式数据示例
pubDate: 2025/02/22 11:09:00
updatedDate: 2025/02/22 11:09:00
author: NPMRUN
category: 代码
tags:
  - 代码
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/69940657_p01.webp
hot: false
hidden: false
relatedPosts: []
---
> 服务端  
采用的可读流传输

```
import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res)=>{
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Solution 3: Pipe
  const readable = fs.createReadStream('test.txt');
  readable.pipe(res).on('error', ()=>{
    res.statusCode = 500;
    res.end('File reading error!');
  });
});

server.listen(3000, ()=>{
  console.log('listening... http://localhost:3000');
});
```

>  客户端

```
const response = await fetch("http://localhost:3000", {
    method: 'GET',
  });

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body.getReader();
  let decoder = new TextDecoder();
  let resultData = '';

 while (true) {
    const { done, value } = await reader.read();
    if (done) break;
   resultData += decoder.decode(value);
    while (resultData.includes('\n')) {
      resultData = resultData.replaceAll("\n", "")
    }
    console.log(resultData)
 }
```
