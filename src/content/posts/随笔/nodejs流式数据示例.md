---
title: nodejs流式数据示例
pubDate: 2025/02/22 11:09:00
updatedDate: 2025/02/22 11:09:00
author: NPMRUN
category: 随笔
tags:
  - 随笔
heroImage: https://api.r10086.com/樱道随机图片api接口.php?图片系列=动漫综合2
hot: false
hidden: false
relatedPosts: []
---
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
