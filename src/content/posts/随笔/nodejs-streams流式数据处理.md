---
title: "[NodeJS] Streams流式数据处理 "
pubDate: 2025/02/22 11:01:00
updatedDate: 2025/02/22 11:01:00
author: NPMRUN
category: 技术
tags:
  - 技术
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/68983513_p01.webp
hot: false
hidden: false
relatedPosts: []
---
在现代应用开发中，数据处理的效率和资源管理尤为重要。NodeJS作为一种高效的JavaScript运行时环境，通过其强大的流（Stream）功能，提供了处理大规模数据的便捷方式。流式数据处理不仅能够优化内存使用，还可以提高数据处理的实时性和效率。下文将介绍NodeJS中的流概念、流的类型以及如何利用流来进行数据传输和处理。

#### 流的基本概念

流式数据的特点是将数据分成一个一个的chunk，每次操作只针对其中的一小部分。

因此流式数据的读写操作不需要将**整个数据**保存在内存中（处理完就丢掉）。

常用于视频这种包含大量数据的应用场景，也可以在时间和空间角度上更有效地处理数据：

*   时间：从开始读到流就可以处理数据并反馈给用户了，不需要等待全部数据到达，例如：ChatGPT的回答，就是流式数据传输，一个字一个字地显示出来；
*   空间：如上文所说，在某些场景下不需要将整个数据保存在内存中。

#### NodeJS提供的API

NodeJS中的`node:stream`模块提供了对流数据进行处理的抽象接口。

**NodeJS中的所有流对象都可以监听和触发事件，都是`EventEmitter`的实例对象。**

_下面的表格列出了每一种基本流常用且重要的事件_

NodeJS中有四种基本的流类型：可读流、可写流、双工流和转换流。

|  | 描述 | 案例 | 事件 | 方法 |
| --- | --- | --- | --- | --- |
| 可读流 Readable Streams | 可用于读(消费)数据 | 1\. `http` request  
2\. `fs` read streams | `data`  
`end` | `pipe()`  
`read` |
| 可写流 Writable Streams | 可用于写(生产)数据 | 1\. `http` responses  
2\. `fs` write streams | `drain`  
`finish` | `write()`  
`end()` |
| 双工流 Duplex Streams | 可读可写 | `net` 网络套接字 |  |  |
| 转换流 Transform Streams | 双工流，在读写的时候可修改 | `zlib` Gzip creation |  |  |

#### 流式数据传输案例

**简介**：创建一个比较大的文本文件，使用NodeJS启动一个服务，接口分别以三种方法返回文件内容。

**代码**：

##### 方法一 不使用流

读取整个文件的内容之后再返回；

读取大文件的时候不推荐这样写，因为整个文件会先被完整地从磁盘读取到内存中，再返回给客户端。

```javascript
import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res)=>{
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Solution 1
  fs.readFile('test.txt', (err, data)=>{
    if(err)console.log(err);
    res.end(data);
  });
});

server.listen(3000, ()=>{
  console.log('listening...');
});
```

##### 方法二 可读流

使用可读流，优点是边读文件边返回，只有当前处理的chunk会占据内存；

```javascript
import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer();

server.on('request', (req, res)=>{
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Solution 2: Streams
  const readable = fs.createReadStream('test.txt');
  readable.on('data', (chunk)=>{
    res.write(chunk);
  });
  readable.on('end', ()=>{
    res.end();
  });
  readable.on('error', (err)=>{
    console.log(err);
    res.statusCode = 500;
    res.end('File reading error!');
  });
});

server.listen(3000, ()=>{
  console.log('listening...');
});
```

##### backpressure

这里介绍一下流控(Flow Controll)领域中的一个名词：Backpressure（翻译为 反压/背压）。

在Node.js和其他流处理系统中，backpressure（反压/背压）是指生产者生成数据的速度超过消费者处理数据的速度时产生的一种控制机制。

当可读流（Readable Stream）读取数据的速度快于可写流（Writable Stream）写入数据的速度时，就会产生backpressure。为了防止这种情况，可读流会根据可写流的消费能力进行控制，暂停或减慢读取数据的速度。

**具体机制**：

1.  可写流的缓冲区：可写流内部有一个缓冲区，用于暂存数据。如果这个缓冲区被填满，流会返回 `false`，表示消费者已经无法及时处理更多的数据。
2.  暂停和恢复：当可写流返回 `false` 时，可读流会暂停读取数据。只有在可写流的缓冲区有足够的空间后，可读流才会恢复读取。
3.  事件驱动：Node.js 流通过事件驱动的方式处理backpressure。当可写流的缓冲区有空间时，会触发 `drain` 事件，通知可读流继续读取数据。

**示例代码**：通过手动暂停和恢复合理利用缓冲区，避免数据丢失、内存溢出和资源耗尽。

```javascript
import fs from 'node:fs';

const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

readableStream.on('data', (chunk)=>{
  const canWrite = writableStream.write(chunk);
  // 可写流的缓冲区空间不够了，暂停读数据(生产)
  if(!canWrite){
    readableStream.pause();
  }
});

// 当可写流的缓冲区空间足够，会触发`drain`事件
// 可以继续读数据
writableStream.on('drain', ()=>{
  readableStream.resume();
});

// 读取结束，停止写入
readableStream.on('end', ()=>{
  writableStream.end();
  console.log('done.');
});
```

##### pipe

在 Node.js 中，`pipe` 方法提供了一种更简单和自动化的方式来处理流之间的 backpressure 问题。`pipe` 方法可以连接可读流和可写流，并自动处理 backpressure，无需手动暂停和恢复流。

**示例代码**：

```javascript
import fs from 'node:fs';

const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

// 统一错误处理函数
function handleError(err) {
  console.error('发生错误:', err);
}

// 使用 pipe 连接可读流和可写流，并处理错误
readableStream.pipe(writableStream)
  .on('error', handleError);

// 处理可读流和可写流的错误
readableStream.on('error', handleError);
writableStream.on('error', handleError);

```

语法是：

```javascript
readableSource.pipe(writableDestination);
```

接下来回到上文的关于流式数据网络传输的案例。

##### 方法三 pipe

使用`pipe`可以简化许多代码，核心代码就是

```javascript
readable.pipe(res);
```

示例代码：

```javascript
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
  console.log('listening...');
});
```

#### 总结

*   流（Stream）在NodeJS中的工作原理是将数据分成一个个小块进行处理，这样无需将整个数据加载到内存中，从而优化了内存使用和数据处理效率。
*   流在NodeJS中有四种基本类型：可读流、可写流、双工流和转换流，每种类型都有其特定的应用场景和事件机制。
*   流的应用场景主要包括视频播放、文件处理、实时数据传输等。在这些场景中，流通过边读边写、边处理边传输的方式，可以有效地提高数据处理的实时性和系统的性能。

#### 参考

\[1\] [B站 - NodeJS教程](https://www.bilibili.com/video/BV1FY4y1H7ka)  
\[2\] [知乎 - 如何形象的描述反应式编程中的背压(Backpressure)机制？](https://www.zhihu.com/question/49618581/answer/117107570)

本文转自 <https://www.cnblogs.com/feixianxing/p/18290492/node-js-streams>，如有侵权，请联系删除。
